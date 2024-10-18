import { IChangeable } from "../../base/View";

export interface ContactsData {
  email: string;
  phone: string;
}

export interface ContactsViewSettings extends IChangeable<ContactsData> {
  email: string;
  phone: string;
  submitButton: string;
}