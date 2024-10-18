import { ContactsData, ContactsViewSettings } from '@app/types/components/view/partial/ContactsData';
import { View } from '../../base/View';

export class ContactsView extends View<ContactsData, ContactsViewSettings> {
  private submitButton: HTMLElement;

  init() {
    this.submitButton = this.ensure(this.settings.submitButton);

    this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
    this.element.addEventListener('change', this.onSubmitHandler.bind(this));
  }

  onSubmitHandler(event: SubmitEvent) {
    event.preventDefault();
    this.settings.onChange({ event, value: this.data });
    (this.submitButton as HTMLButtonElement).disabled = !(Boolean(this.data.phone.length) && Boolean(this.data.email.length));
    return false;
  }

  set email(value: string) {
    console.log('value :>> ', value);
    this.setValue<HTMLInputElement>(this.settings.email, {
      value,
    });
  }

  set phone(value: string) {
    this.setValue<HTMLInputElement>(this.settings.phone, {
      value,
    });
  }

  get data() {
    return {
      email: this.ensure<HTMLInputElement>(this.settings.email).value,
      phone: this.ensure<HTMLInputElement>(this.settings.phone).value,
    };
  }
}
