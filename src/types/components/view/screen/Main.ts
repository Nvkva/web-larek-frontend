import { Product } from "../../model/ProductApi";
import { CardData } from "../partial/Card";

export interface MainData {
	items: CardData[];
	selected: Product;
}

export interface MainSettings {
	onOpenBasket: () => void;
	onOpenProduct: (id: string) => void;
	loadProducts: () => Promise<void>;
}
