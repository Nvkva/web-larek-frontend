import { IClickableEvent } from "../../base/View";
import { Product } from "../../model/ProductApi";
import { CardData } from "../partial/Card";

export interface MainData {
	items: CardData[];
	selected: Product;
}

export interface MainSettings {
	onOpenBasket: () => void;
	onOpenProduct: (args: IClickableEvent<string>) => void;
}
