import IITem from "./IITem";

export default interface IPoint {
  id: string,
  name: string,
  email: string,
  whatsapp: string,
  latitude: number,
  longitude: number,
  city: string,
  uf: string,
  items: IITem[]
}