import { ContactsData } from "../partial/ContactsData";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface CredentialsData extends ModalScreenData {
	email: string;
  phone: string;
}

export interface CredentialsSettings extends ModalScreenSettings<ContactsData> {
}
