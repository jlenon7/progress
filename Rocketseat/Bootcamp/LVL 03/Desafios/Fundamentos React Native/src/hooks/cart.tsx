import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await AsyncStorage.getItem('@GoMarketplace:products');
      if (response) {
        setProducts(JSON.parse(response));
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function productsUpdate(): Promise<void> {
      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(products),
      );
      // await AsyncStorage.removeItem('@GoMarketplace:products');
    }

    productsUpdate();
  }, [products]);

  const addToCart = useCallback(
    async product => {
      const productIndex = products.findIndex(
        oldProduct => oldProduct.id === product.id,
      );

      if (productIndex >= 0) {
        const productsUpdated = products.map(oldProduct => {
          if (product.id === oldProduct.id) {
            oldProduct.quantity += 1;
          }
          return oldProduct;
        });
        setProducts(productsUpdated);
      } else {
        const newProduct = product;
        newProduct.quantity = 1;
        setProducts([...products, newProduct]);
      }
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const productsUpdated = products.map(product => {
        if (product.id === id) {
          product.quantity += 1;
        }
        return product;
      });
      setProducts(productsUpdated);
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productFinded = products.find(product => product.id === id);
      if (productFinded?.quantity === 1) {
        const productsUpdated = products.filter(product => product.id !== id);
        setProducts(productsUpdated);
      } else {
        const productsUpdated = products.map(product => {
          if (product.id === id) {
            product.quantity -= 1;
          }
          return product;
        });
        setProducts(productsUpdated);
      }
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
