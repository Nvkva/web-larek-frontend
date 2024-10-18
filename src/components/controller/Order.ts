import { Controller } from '@app/components/base/Controller';
import { IClickableEvent } from '@app/types/components/base/View';
import { AppState, AppStateModals } from '@app/types/components/model/AppState';
import { OrderData } from '@app/types/components/view/partial/OrderData';

export class OrderController extends Controller<AppState> {
  onSubmit = () => {
    this.model.openModal(AppStateModals.contacts);
  };
  onClose = () => {
    this.model.openModal(AppStateModals.none);
  };
  onChange = (value: OrderData) => {
    this.model.fillOrderData(value);
  };
}
