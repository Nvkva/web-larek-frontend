import { Controller } from '@app/components/base/Controller';
import { AppState, AppStateModals } from '@app/types/components/model/AppState';

export class SuccessController extends Controller<AppState> {
  onSubmit = () => {
    this.model.openModal(AppStateModals.none);
  };
  onClose = () => {
    this.model.openModal(AppStateModals.none);
  };
}
