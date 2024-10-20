import { Controller } from '@app/components/base/Controller';
import { AppState, AppStateModals } from '@app/types/components/model/AppState';
import { ContactsData } from '@app/types/components/view/partial/ContactsData';

export class ContactsController extends Controller<AppState> {
  onSubmit = async () => {
    const request = this.model.orderRequest;
    try {
      const requestResult = await this.api.postOrder(request);
      if (requestResult.total === request.total) {
        this.model.openModal(AppStateModals.success);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };
  onClose = () => {
    this.model.openModal(AppStateModals.none);
  };
  onChange = (value: ContactsData) => {
    this.model.fillContactsData(value);
  };
}
