import { BasketProductData } from "@app/types/components/view/partial/BasketProduct";
import { AppState, AppStateChanges, AppStateModals, AppStateSettings } from "../../types/components/model/AppState";
import { IProductAPI, Order, Product } from "@app/types/components/model/ProductApi";
import { SETTINGS } from "@app/utils/constants";
import { OrderData } from "@app/types/components/view/partial/OrderData";
import { ContactsData } from "@app/types/components/view/partial/ContactsData";

export class AppStateModel implements AppState {
	public products: Map<string, Product> = new Map<string, Product>();
	public openedModal: AppStateModals = AppStateModals.none;
	public modalMessage: string | null = null;
	public basket: Map<string, BasketProductData> = new Map<string, BasketProductData>();
	public selectedProduct: Product | null = null;
	public totalLabel: string = '';

	public orderData: OrderData | null = null;

	public get contactsInfo(): ContactsData | null {
		return this.contactsData;
	}

	public get orderRequest(): Order {
		return {
			payment: this.orderData.selectedPayMethod,
			email: this.contactsData.email,
			phone: this.contactsData.phone,
			address: this.orderData.address,
			total: this.totalNumber,
			items: Array.from(this.basket.values()).map(item => item.id),
		}
	}

	protected settings: AppStateSettings;
	private totalNumber: number = 0;
	private contactsData: ContactsData | null = null;

	constructor(settings: AppStateSettings) {
		this.settings = settings;
	}

	setProducts(products: Product[]): void {
		this.products.clear();
		for (const product of products) {
			this.products.set(product.id, product);
		}
		this.notifyChanged(AppStateChanges.products);
	}

	selectProduct(product: Product): void {
		if (!product) {
			this.selectedProduct = null;
			this.notifyChanged(AppStateChanges.productView);
			return;
		}
		if (product) {
			this.selectedProduct = product;
			this.notifyChanged(AppStateChanges.productView);
		} else {
			throw new Error(`Invalid product`);
		}
	}

	protected notifyChanged(changed: AppStateChanges): void {
		this.settings.onChange(changed);
	}

	// UI methods
	openModal(modal: AppStateModals): void {
		if (this.openedModal !== modal) {
			this.openedModal = modal;
			this.notifyChanged(AppStateChanges.modal);
		}
	}

	setMessage(message: string | null, isError = false): void {
		this.modalMessage = message;
		this.notifyChanged(AppStateChanges.modalMessage);
	}

	addProductInBasket(): void {
		if (this.selectedProduct && !this.basket.has(this.selectedProduct.id)) {
			const index = this.basket.size + 1;
			this.basket.set(this.selectedProduct.id, { index, ...this.selectedProduct });
		}
		this.calculateTotal();
		this.notifyChanged(AppStateChanges.basket);
	}

	removeProductFormBasket(id: string): void {
		if (!this.basket.has(id)) {
			throw new Error(`Invalid ticket key: ${id}`);
		}
		this.basket.delete(id);

		let index = 1;
		this.basket.forEach(item => {
			this.basket.set(item.id, { ...item, index });
			index++;
		})
		this.calculateTotal();
		this.notifyChanged(AppStateChanges.basket);
	}

	fillOrderData(value: OrderData): void {
		this.orderData = value;
		this.notifyChanged(AppStateChanges.order);
	}

	fillContactsData(value: ContactsData): void {
		this.contactsData = value;
		this.notifyChanged(AppStateChanges.contacts);
	}

	resetState(): void {
		this.basket.clear();
		this.notifyChanged(AppStateChanges.counter);
	}

	private calculateTotal(): void {
		const basketValues: BasketProductData[] = Array.from(this.basket.values());
		const totalValue = basketValues.reduce((acc, item) => acc + Number(item.price), 0);
		this.totalNumber = totalValue;

		this.totalLabel = basketValues.find(item => item.price === null) ?
			SETTINGS.pricelessTotalLabel :
			String(totalValue);
	}
}

