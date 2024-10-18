import { ModalScreen } from "./ModalScreen";
import { IChangeableEvent, IView } from "@app/types/components/base/View";
import { SETTINGS } from "@app/utils/constants";
import { cloneTemplate } from "@app/utils/utils";
import { OrderScreenData, OrderScreenSettings } from "@app/types/components/view/screen/OrderData";
import { OrderInfoView } from "../partial/Order";
import { OrderData } from "@app/types/components/view/partial/OrderData";
import { ContactsData } from "@app/types/components/view/partial/ContactsData";
import { ContactsView } from "../partial/Contacts";
import { ContactsScreenData, ContactsScreenSettings } from "@app/types/components/view/screen/Contacts";

export class ContactsScreen extends ModalScreen<
  ContactsData,
  ContactsScreenData,
  ContactsScreenSettings
> {
  initContent(): IView<ContactsData> {
    return new ContactsView(cloneTemplate(SETTINGS.contactsTemplate), {
      ...SETTINGS.contactsSettings,
      onChange: this.onFormChange.bind(this),
    });
  }

  protected onFormChange({ value }: IChangeableEvent<ContactsData>) {
    this.settings.onChange(value);
  }

  set data(data: ContactsData) {
    this.modal.content = data;
  }
}
