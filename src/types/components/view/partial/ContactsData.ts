import { IChangeable, IClickableEvent } from "../../base/View";

export interface ContactsData {
  email: string;
  phone: string;
}

export interface ContactsViewSettings extends IChangeable<ContactsData> {
  email: string;
  phone: string;
  submitButton: string;
  onSubmit: (args: IClickableEvent<MouseEvent>) => void;
}