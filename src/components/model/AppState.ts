import { AppState, AppStateChanges, AppStateModals, AppStateSettings } from "../../types/components/model/AppState";
import { IProductAPI, Product } from "@app/types/components/model/ProductApi";

export class AppStateModel implements AppState {
	_selectedProduct: string | null = null;
	products: Map<string, Product> = new Map<string, Product>();

  openedModal: AppStateModals = AppStateModals.none;
	modalMessage: string | null = null;

  constructor(protected api: IProductAPI, protected settings: AppStateSettings) {}

  get selectedProduct(): Product | null {
		return this._selectedProduct && this.products.has(this._selectedProduct)
			? this.products.get(this._selectedProduct)
			: null;
	}

  async loadProducts(): Promise<void> {
		this.products.clear();
		const products = await this.api.getProducts();
		for (const product of products) {
			this.products.set(product.id, product);
		}
		this.notifyChanged(AppStateChanges.products);
	}

	async loadProductItem(id: string): Promise<void> {
		if (!this.products.has(id)) {
			throw new Error(`Invalid product id: ${id}`);
		}
		this._selectedProduct = id;
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

  	// user actions
	// selectProduct(id: string | null): void {
	// 	if (!id) {
	// 		this._selectedProduct = null;
	// 		this.notifyChanged(AppStateChanges.selectedProduct);
	// 		return;
	// 	}
	// 	if (this.products.has(id)) {
	// 		this._selectedProduct = id;
	// 		this.notifyChanged(AppStateChanges.selectedProduct);
	// 	} else {
	// 		throw new Error(`Invalid product id: ${id}`);
	// 	}
	// }
}

