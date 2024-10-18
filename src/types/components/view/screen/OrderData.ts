import { OrderData } from "../partial/OrderData";
import { ModalScreenData, ModalScreenSettings } from "./ModalScreen";

export interface OrderScreenData extends ModalScreenData {
}

export interface OrderScreenSettings extends ModalScreenSettings {
  onCashOptionSelect: () => void;
  onCardOptionsSelect: () => void;
  onChange: (data: OrderData) => void;
}