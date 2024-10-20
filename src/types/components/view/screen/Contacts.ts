import { ContactsData } from "../partial/ContactsData";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface ContactsScreenData extends ModalScreenData {
  data: ContactsData;
}

export interface ContactsScreenSettings extends ModalScreenSettings<ContactsData> {
  onChange: (data: ContactsData) => void;
}