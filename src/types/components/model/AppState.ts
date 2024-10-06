import { IProductAPI, Product } from "@app/types/components/model/ProductApi";

export enum AppStateModals {
	productView = 'modal:productView',
	basket = 'modal:basket',
	contacts = 'modal:contacts',
	success = 'modal:success',
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
}

// Модель данных приложения
export interface AppState {
	products: Map<string, Product>;

	// Заполняемые пользователем данные
	selectedProduct: Product | null;
	openedModal: AppStateModals;

	// Пользовательские действия
	// selectProduct(id: string): void;
	loadProducts(): Promise<void>;
	loadProductItem(id: string): Promise<void>;

	// Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
}

// Настройки модели данных
export interface AppStateSettings {
	storageKey: string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
}

// Конструктор модели данных
export interface AppStateConstructor {
	new(api: IProductAPI, settings: AppStateSettings): AppState;
}