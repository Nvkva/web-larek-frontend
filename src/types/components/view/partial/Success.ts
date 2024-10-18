import { IChangeable, IClickable, IClickableEvent } from "../../base/View";

export type PayMethod = 'card' | 'cash';

export interface SuccessData {
  totalDescription: string;
}

export interface SuccessViewSettings extends IClickable<void> {
  description: string,
  submitButton: string,
}