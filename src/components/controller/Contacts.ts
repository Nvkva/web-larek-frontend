import { Controller } from '@app/components/base/Controller';
import { AppState, AppStateModals } from '@app/types/components/model/AppState';
import { OrderData } from '@app/types/components/view/partial/OrderData';

export class ContactsController extends Controller<AppState> {
  onSubmit = () => {
    this.model.openModal(AppStateModals.success);
  };
  onClose = () => {
    this.model.openModal(AppStateModals.none);
  };
  onChange = (value: any) => {
    // this.model.fillOrderData(value);
  };
}
