import { IChangeableEvent } from "../../base/View";
import { OrderData } from "../partial/OrderData";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface OrderScreenData extends ModalScreenData {
  data: OrderData;
}

export interface OrderScreenSettings extends ModalScreenSettings<OrderData> {
  onChange: (args: IChangeableEvent<OrderData>) => void;
}