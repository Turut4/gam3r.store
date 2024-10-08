import { Pedido } from "../pedido";

export interface Usuario {
  id: number;
  username: string;
  password: string;
  email: string;

  pedidos: Pedido[];
}
