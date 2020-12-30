import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface IRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: IRequest): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type only can be income or outcome');
    }

    if (
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total - value < 0
    ) {
      throw Error(
        'Not be able to create outcome transaction without a valid balance',
      );
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
