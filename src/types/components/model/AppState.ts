import { IProductAPI, Order, Product } from "@app/types/components/model/ProductApi";
import { BasketProductData } from "../view/partial/BasketProduct";
import { OrderData } from "../view/partial/OrderData";
import { ContactsData } from "../view/partial/ContactsData";

export enum AppStateModals {
	productView = 'modal:productView',
	basket = 'modal:basket',
	order = 'modal:order',
	contacts = 'modal:contacts',
	// success = 'modal:success',
	none = 'modal:none',
}

// Какие изменения состояния приложения могут происходить
export enum AppStateChanges {
	products = 'change:product',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	productView = 'change:productView',
	basket = 'change:basket',
	order = 'change:order',
	contacts = 'modal:contacts',
}

// Модель данных приложения
export interface AppState {
	products: Map<string, Product>;
	selectedProduct: Product | null;
	openedModal: AppStateModals;
	basket: Map<string, BasketProductData>;
	totalLabel: string;
	orderData: OrderData | null;
	contactsInfo: ContactsData | null;
	orderRequest: Order;

	openModal(modal: AppStateModals): void;
	selectProduct(product: Product): void;
	addProductInBasket(): void;
	removeProductFormBasket(id: string): void;
	setProducts(products: Product[]): void;
	fillOrderData(value: OrderData): void;
	fillContactsData(value: ContactsData): void;
}

// Настройки модели данных
export interface AppStateSettings {
	storageKey: string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
}

// Конструктор модели данных
export interface AppStateConstructor {
	new(settings: AppStateSettings): AppState;
}