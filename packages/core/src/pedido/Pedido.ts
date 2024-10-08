import { FormaPagamento } from "./FormaPagamento";
import ItemPedido from "./ItemPedido";
import PedidoEntrega from "./PedidoEntrega";
import { Status } from "./Status";

export default interface Pedido {
  id: number;
  usuarioId: number;
  data: Date;
  itens: ItemPedido[];
  valorTotal: number;
  status: Status;
  formaPagamento: FormaPagamento;
  entrega: PedidoEntrega;
}