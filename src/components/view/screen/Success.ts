import { ModalScreen } from "./ModalScreen";
import { IChangeableEvent, IView } from "@app/types/components/base/View";
import { SETTINGS } from "@app/utils/constants";
import { cloneTemplate } from "@app/utils/utils";
import { SuccessScreenData, SuccessScreenSettings } from "@app/types/components/view/screen/Success";
import { SuccessView } from "../partial/Success";
import { SuccessData } from "@app/types/components/view/partial/Success";

export class SuccessScreen extends ModalScreen<
  SuccessData,
  SuccessScreenData,
  SuccessScreenSettings
> {
  initContent(): IView<SuccessData> {
    return new SuccessView(cloneTemplate(SETTINGS.successTemplate), {
      ...SETTINGS.successSettings,
      onClick: this.settings.onSubmit,
    });
  }

  set data(data: SuccessData) {
    this.modal.content = data;
  }
}
