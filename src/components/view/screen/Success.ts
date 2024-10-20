import { ModalScreen } from "./ModalScreen";
import { IView } from "@app/types/components/base/View";
import { SuccessScreenData, SuccessScreenSettings } from "@app/types/components/view/screen/Success";
import { SuccessView } from "../partial/Success";
import { SuccessData } from "@app/types/components/view/partial/Success";

export class SuccessScreen extends ModalScreen<
  SuccessData,
  SuccessScreenData,
  SuccessScreenSettings
> {
  constructor(settings: SuccessScreenSettings, private successView: SuccessView) {
    super(settings);
  }

  initContent(): IView<SuccessData> {
    return this.successView;
  }

  set data(data: SuccessData) {
    this.modal.content = data;
  }
}
