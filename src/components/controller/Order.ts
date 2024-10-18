import { Controller } from '@app/components/base/Controller';
import { IClickableEvent } from '@app/types/components/base/View';
import { AppState, AppStateModals } from '@app/types/components/model/AppState';

export class OrderController extends Controller<AppState> {
  onSubmit = () => {
    this.model.openModal(AppStateModals.contacts);
  };
  onClose = () => {
    this.model.openModal(AppStateModals.none);
  };
  onCashOptionSelect = () => {

  };
  onCardOptionsSelect = () => {

  };
  onChange = () => {

  };
}
