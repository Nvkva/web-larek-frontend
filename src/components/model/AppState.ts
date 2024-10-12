import { AppState, AppStateChanges, AppStateModals, AppStateSettings } from "../../types/components/model/AppState";
import { IProductAPI, Product } from "@app/types/components/model/ProductApi";

export class AppStateModel implements AppState {
	public products: Map<string, Product> = new Map<string, Product>();
	public openedModal: AppStateModals = AppStateModals.none;
	public modalMessage: string | null = null;
	public basket: Product[] = [];
	public selectedProduct: Product | null = null;

	constructor(protected api: IProductAPI, protected settings: AppStateSettings) { }

	setProducts(products: Product[]): void {
		this.products.clear();
		for (const product of products) {
			this.products.set(product.id, product);
		}
		this.notifyChanged(AppStateChanges.products);
	}

	async loadProductItem(id: string): Promise<void> {
		if (!this.products.has(id)) {
			throw new Error(`Invalid product id: ${id}`);
		}
		try {
			await this.api.getProduct(id);
		} catch (err: unknown) {
			if (err instanceof Error) {
				this.setMessage(err.message, true);
			}
			if (typeof err === 'string') {
				this.setMessage(err, true);
			}
		}
		this.notifyChanged(AppStateChanges.productView);
	}

	selectProduct(product: Product): void {
		if (!product) {
			this.selectedProduct = null;
			return;
		}
		if (product) {
			this.selectedProduct = product;
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
		if (this.selectedProduct && !this.basket.find(item => item.id === this.selectedProduct.id)) {
			this.basket.push(this.selectedProduct);
		}
	}

	removeProductFormBasket(id: string): void {
		this.basket = this.basket.filter(item => !(item.id === id));
	}
}

