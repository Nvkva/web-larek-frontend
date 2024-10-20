import { ModalScreen } from "./ModalScreen";
import { IChangeableEvent, IView } from "@app/types/components/base/View";
import { ContactsData } from "@app/types/components/view/partial/ContactsData";
import { ContactsView } from "../partial/Contacts";
import { ContactsScreenData, ContactsScreenSettings } from "@app/types/components/view/screen/Contacts";

export class ContactsScreen extends ModalScreen<
  ContactsData,
  ContactsScreenData,
  ContactsScreenSettings
> {
  constructor(settings: ContactsScreenSettings, private contactsView: ContactsView) {
    super(settings);
  }

  initContent(): IView<ContactsData> {
    return this.contactsView;
  }

  protected onFormChange(event: IChangeableEvent<ContactsData>) {
    this.settings.onChange(event);
  }

  set data(data: ContactsData) {
    this.modal.content = data;
  }
}
