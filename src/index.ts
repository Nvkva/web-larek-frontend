import { BasketController } from './components/controller/Basket';
import { MainController } from './components/controller/Main';
import { ProductViewController } from './components/controller/ProductViewController';
import { AppStateModel } from './components/model/AppState';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { ProductAPI } from './components/model/ProductApi';
import { ListView } from './components/view/common/List';
import { ModalView } from './components/view/common/Modal';
import { BasketView } from './components/view/partial/Basket';
import { BasketProductView } from './components/view/partial/BasketProduct';
import { CardView } from './components/view/partial/Card';
import { PageView } from './components/view/partial/Page';
import { ProductView } from './components/view/partial/Product';
import { BasketViewScreen } from './components/view/screen/Basket';
import { MainScreen } from './components/view/screen/Main';
import { ProductViewScreen } from './components/view/screen/ProductView';
import './scss/styles.scss';
import { AppStateChanges, AppStateModals } from './types/components/model/AppState';
import { ModalChange } from './types/components/model/AppStateEmitter';
import { BasketProductData, BasketViewData } from './types/components/view/partial/BasketProduct';
import { CardData } from './types/components/view/partial/Card';
import { ProductData } from './types/components/view/partial/ProductData';
import { BasketData } from './types/components/view/screen/Basket';
import { API_URL, CDN_URL, SETTINGS } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const api = new ProductAPI(CDN_URL, API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppStateModel);

api.getProducts()
	.then((products) => {
		app.model.setProducts(products);
	})
	.catch((err: string) => console.log(`Error: `, err));

const mainController = new MainController(app.model, api);
const page = new PageView(ensureElement(SETTINGS.pageSelector), {
	...SETTINGS.pageSettings,
	onClick: mainController.onOpenBasket,
});
const gallery = new ListView<CardData>(
	ensureElement(SETTINGS.gallerySelector),
	{
		...SETTINGS.gallerySettings,
		item: new CardView(cloneTemplate(SETTINGS.cardCatalog), {
			...SETTINGS.cardSettings,
			onClick: mainController.onOpenProduct,
		}),
	}
);
const main = new MainScreen(mainController, page, gallery);

const productViewController = new ProductViewController(app.model, api);
const productView = new ProductView(cloneTemplate(SETTINGS.productViewElement), {
	...SETTINGS.productViewSettings,
	onClick: productViewController.onSubmit,
});
const productModal = new ModalView<ProductData>(ensureElement(SETTINGS.modalTemplate), {
	...SETTINGS.modalSettings,
	contentView: productView,
	onClose: productViewController.onClose,
});
const productViewScreen = new ProductViewScreen({ ...productViewController, modalView: productModal }, productView);

const basketController = new BasketController(app.model);
const basketElements = new ListView<BasketProductData>(ensureElement(SETTINGS.basketCardsContainerSelector), {
	...SETTINGS.basketModal,
	item: new BasketProductView(cloneTemplate(SETTINGS.basketElementTemplate), {
		...SETTINGS.basketElementSettings,
		onClick: basketController.onRemove,
	}),
});
const basketView = new BasketView(
	cloneTemplate(SETTINGS.basketTemplate),
	{
		...SETTINGS.basketModal,
		...basketController,
		onClick: basketController.onRemove
	},
	basketElements,
);
const basketModal = new ModalView<BasketData>(ensureElement(SETTINGS.modalTemplate), {
	...SETTINGS.modalSettings,
	contentView: basketView,
	onClose: productViewController.onClose,
});
const basketViewScreen = new BasketViewScreen({ ...basketController, modalView: basketModal }, basketView);

const modal = {
	[AppStateModals.productView]: productViewScreen,
	[AppStateModals.basket]: basketViewScreen
	// [AppStateModals.order]: new OrderInfoScreen(
	// 	new OrderController(app.model)
	// ),
	// [AppStateModals.contacts]: new ContactsScreen(
	// 	new ContactsController(app.model, api)
	// ),
	// [AppStateModals.success]: new SuccessScreen(
	// 	new SuccessController(app.model)
	// ),
};

app.on(AppStateChanges.modal, ({ previous, current }: ModalChange) => {
	main.page.isLocked = current !== AppStateModals.none;
	if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
	}
});

app.on(AppStateChanges.products, () => {
	main.items = Array.from(app.model.products.values());
});

app.on(AppStateModals.productView, () => {
	modal[AppStateModals.productView].render({
		product: app.model.selectedProduct,
		isActive: true,
	});
});

app.on(AppStateChanges.basket, () => {
	main.counter = app.model.basket.size;
	modal[AppStateModals.basket].products = Array.from(app.model.basket.values());
	// modal[AppStateModals.basket].isDisabled = app.model.basket.size === 0;
	modal[AppStateModals.basket].total = app.model.totalLabel;
});

app.on(AppStateModals.basket, () => {
	modal[AppStateModals.basket].render({
		products: Array.from(app.model.basket.values()),
		isDisabled: app.model.basket.size === 0,
		isActive: true,
		total: app.model.totalLabel,
	});
});

// app.on(AppStateModals.order, () => {
// 	modal[AppStateModals.order].render({
// 		data: { address: '', selectedPayMethod: 'card' },
// 		isActive: true,
// 		isDisabled: !app.model.orderData?.address,
// 	});
// });

// app.on(AppStateChanges.order, () => {
// 	modal[AppStateModals.order].data = app.model.orderData;
// });

// app.on(AppStateModals.contacts, () => {
// 	modal[AppStateModals.contacts].render({
// 		data: { email: '', phone: '' },
// 		isActive: true,
// 		isDisabled: !app.model.contactsInfo?.email && !app.model.contactsInfo?.phone,
// 	});
// });

// app.on(AppStateChanges.contacts, () => {
// 	modal[AppStateModals.contacts].data = app.model.contactsInfo;
// });

// app.on(AppStateModals.success, () => {
// 	modal[AppStateModals.success].render({
// 		data: { totalDescription: app.model.totalLabel },
// 		isActive: true,
// 	});
// });