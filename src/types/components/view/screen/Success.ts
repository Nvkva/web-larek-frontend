import { SuccessData } from "../partial/Success";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface SuccessScreenData extends ModalScreenData {
  data: SuccessData;
}

export interface SuccessScreenSettings extends ModalScreenSettings<SuccessData> {
}
