import { BasketController } from './components/controller/Basket';
import { ContactsController } from './components/controller/Contacts';
import { MainController } from './components/controller/Main';
import { OrderController } from './components/controller/Order';
import { ProductViewController } from './components/controller/ProductViewController';
import { SuccessController } from './components/controller/Success';
import { AppStateModel } from './components/model/AppState';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { ProductAPI } from './components/model/ProductApi';
import { BasketViewScreen } from './components/view/screen/Basket';
import { ContactsScreen } from './components/view/screen/Contacts';
import { MainScreen } from './components/view/screen/Main';
import { OrderInfoScreen } from './components/view/screen/OrderInfo';
import { ProductViewScreen } from './components/view/screen/ProductView';
import { SuccessScreen } from './components/view/screen/Success';
import './scss/styles.scss';
import { AppStateChanges, AppStateModals } from './types/components/model/AppState';
import { ModalChange } from './types/components/model/AppStateEmitter';
import { API_URL, CDN_URL, SETTINGS } from './utils/constants';

const api = new ProductAPI(CDN_URL, API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppStateModel);

api.getProducts()
	.then((products) => {
		app.model.setProducts(products);
	})
	.catch((err: string) => console.log(`Error: `, err));

const main = new MainScreen(new MainController(app.model, api));
const modal = {
	[AppStateModals.productView]: new ProductViewScreen(
		new ProductViewController(app.model, api)
	),
	[AppStateModals.basket]: new BasketViewScreen(
		new BasketController(app.model)
	),
	[AppStateModals.order]: new OrderInfoScreen(
		new OrderController(app.model)
	),
	[AppStateModals.contacts]: new ContactsScreen(
		new ContactsController(app.model, api)
	),
	[AppStateModals.success]: new SuccessScreen(
		new SuccessController(app.model)
	),
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
	modal[AppStateModals.basket].isDisabled = app.model.basket.size === 0;
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

app.on(AppStateModals.order, () => {
	modal[AppStateModals.order].render({
		data: { address: '', selectedPayMethod: 'card' },
		isActive: true,
		isDisabled: !app.model.orderData?.address,
	});
});

app.on(AppStateChanges.order, () => {
	modal[AppStateModals.order].data = app.model.orderData;
});

app.on(AppStateModals.contacts, () => {
	modal[AppStateModals.contacts].render({
		data: { email: '', phone: '' },
		isActive: true,
		isDisabled: !app.model.contactsInfo?.email && !app.model.contactsInfo?.phone,
	});
});

app.on(AppStateChanges.contacts, () => {
	modal[AppStateModals.contacts].data = app.model.contactsInfo;
});

app.on(AppStateModals.success, () => {
	modal[AppStateModals.success].render({
		data: { totalDescription: app.model.totalLabel },
		isActive: true,
	});
});