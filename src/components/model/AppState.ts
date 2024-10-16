import { BasketProductData } from "@app/types/components/view/partial/BasketProduct";
import { AppState, AppStateChanges, AppStateModals, AppStateSettings } from "../../types/components/model/AppState";
import { IProductAPI, Product } from "@app/types/components/model/ProductApi";
import { SETTINGS } from "@app/utils/constants";

export class AppStateModel implements AppState {
	public products: Map<string, Product> = new Map<string, Product>();
	public openedModal: AppStateModals = AppStateModals.none;
	public modalMessage: string | null = null;
	public basket: Map<string, BasketProductData> = new Map<string, BasketProductData>();
	public selectedProduct: Product | null = null;

	public get total(): string {
		const basketValues: BasketProductData[] = Array.from(this.basket.values());
		let totalValue: string;
		if (basketValues.find(item => item.price === null)) {
			totalValue = SETTINGS.nullPriceLabel;
		} else {
			totalValue = String(basketValues.reduce((acc, item) => acc + Number(item.price), 0));
		}
		return totalValue;
	}

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
		if (this.selectedProduct && !this.basket.has(this.selectedProduct.id)) {
			const index = this.basket.size + 1;
			this.basket.set(this.selectedProduct.id, { index, ...this.selectedProduct });
		}
		this.notifyChanged(AppStateChanges.basket);
	}

	removeProductFormBasket(id: string): void {
		if (!this.basket.has(id)) {
			throw new Error(`Invalid ticket key: ${id}`);
		}
		this.basket.delete(id);
		this.notifyChanged(AppStateChanges.basket);
	}
}

