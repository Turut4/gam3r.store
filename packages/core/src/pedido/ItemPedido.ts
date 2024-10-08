import { Produto } from "../produto";

export default interface ItemPedido {
  id: number;
  quantidade: number;
  produto: Produto;
  precoUnitario: number;
}
