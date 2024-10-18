import { IChangeable, IClickable } from "../../base/View";

export type PayMethod = 'card' | 'cash'; 

export interface OrderData {
  address: string;
  selectedPayMethod: 'card' | 'cash';
}

export interface OrderViewSettings extends IChangeable<OrderData> {
  cardButton: string;
  cashButton: string;
  address: string;
  submitButton: string;
}