import { BasketController } from './components/controller/Basket';
import { ContactsController } from './components/controller/Contacts';
import { GalleryController } from './components/controller/Gallery';
import { OrderController } from './components/controller/Order';
import { PageController } from './components/controller/Page';
import { ProductViewController } from './components/controller/ProductViewController';
import { SuccessController } from './components/controller/Success';
import { AppStateModel } from './components/model/AppState';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { ProductAPI } from './components/model/ProductApi';
import { ListView } from './components/view/common/List';
import { ModalView } from './components/view/common/Modal';
import { BasketView } from './components/view/partial/Basket';
import { BasketProductView } from './components/view/partial/BasketProduct';
import { CardView } from './components/view/partial/Card';
import { ContactsView } from './components/view/partial/Contacts';
import { OrderInfoView } from './components/view/partial/Order';
import { PageView } from './components/view/partial/Page';
import { ProductView } from './components/view/partial/Product';
import { SuccessView } from './components/view/partial/Success';
import { BasketViewScreen } from './components/view/screen/Basket';
import { ContactsScreen } from './components/view/screen/Contacts';
import { OrderInfoScreen } from './components/view/screen/OrderInfo';
import { ProductViewScreen } from './components/view/screen/ProductView';
import { SuccessScreen } from './components/view/screen/Success';
import './scss/styles.scss';
import { AppStateChanges, AppStateModals } from './types/components/model/AppState';
import { ModalChange } from './types/components/model/AppStateEmitter';
import { BasketProductData } from './types/components/view/partial/BasketProduct';
import { CardData } from './types/components/view/partial/Card';
import { ContactsData } from './types/components/view/partial/ContactsData';
import { OrderData } from './types/components/view/partial/OrderData';
import { ProductData } from './types/components/view/partial/ProductData';
import { SuccessData } from './types/components/view/partial/Success';
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

const pageController = new PageController(app.model, api);
const page = new PageView(ensureElement(SETTINGS.pageSelector), {
	...SETTINGS.pageSettings,
	onClick: pageController.onOpenBasket,
});

const galleryController = new GalleryController(app.model, api);
const gallery = new ListView<CardData>(
	ensureElement(SETTINGS.gallerySelector),
	{
		...SETTINGS.gallerySettings,
		item: new CardView(cloneTemplate(SETTINGS.cardCatalog), {
			...SETTINGS.cardSettings,
			onClick: galleryController.onOpenProduct,
		}),
	}
);

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
		onClick: basketController.onRemove,
		onSubmit: basketController.onSubmit,
	},
	basketElements,
);
const basketModal = new ModalView<BasketData>(ensureElement(SETTINGS.modalTemplate), {
	...SETTINGS.modalSettings,
	contentView: basketView,
	onClose: productViewController.onClose,
});
const basketViewScreen = new BasketViewScreen({ ...basketController, modalView: basketModal }, basketView);

const orderController = new OrderController(app.model);
const orderView = new OrderInfoView(cloneTemplate(SETTINGS.orderTemplate), {
	...SETTINGS.orderSettings,
	onChange: orderController.onChange.bind(this),
	onSubmit: orderController.onSubmit.bind(this),
});
const orderModal = new ModalView<OrderData>(ensureElement(SETTINGS.modalTemplate), {
	...SETTINGS.modalSettings,
	contentView: orderView,
	onClose: orderController.onClose,
});
const orderScreen = new OrderInfoScreen({ ...orderController, modalView: orderModal }, orderView);

const contactsController = new ContactsController(app.model, api);
const contactsView = new ContactsView(cloneTemplate(SETTINGS.contactsTemplate), {
	...SETTINGS.contactsSettings,
	onChange: contactsController.onChange,
	onSubmit: contactsController.onSubmit,
});
const contactsModal = new ModalView<ContactsData>(ensureElement(SETTINGS.modalTemplate), {
	...SETTINGS.modalSettings,
	contentView: contactsView,
	onClose: contactsController.onClose,
});
const contactsScreen = new ContactsScreen({ ...contactsController, modalView: contactsModal }, contactsView);

const successController = new SuccessController(app.model);
const successView = new SuccessView(cloneTemplate(SETTINGS.successTemplate), {
	...SETTINGS.successSettings,
	onClick: successController.onSubmit,
});
const successModal = new ModalView<SuccessData>(ensureElement(SETTINGS.modalTemplate), {
	...SETTINGS.modalSettings,
	contentView: successView,
	onClose: successController.onClose,
});
const successScreen = new SuccessScreen({ ...successController, modalView: successModal }, successView);

const modal = {
	[AppStateModals.productView]: productViewScreen,
	[AppStateModals.basket]: basketViewScreen,
	[AppStateModals.order]: orderScreen,
	[AppStateModals.contacts]: contactsScreen,
	[AppStateModals.success]: successScreen,
};

app.on(AppStateChanges.modal, ({ previous, current }: ModalChange) => {
	page.isLocked = current !== AppStateModals.none;
	if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
	}
});

app.on(AppStateChanges.products, () => {
	gallery.items = Array.from(app.model.products.values());
});

app.on(AppStateModals.productView, () => {
	modal[AppStateModals.productView].render({
		product: app.model.selectedProduct,
		isActive: true,
	});
});

app.on(AppStateChanges.basket, () => {
	page.counter = app.model.basket.size;
	modal[AppStateModals.basket].products = Array.from(app.model.basket.values());
	modal[AppStateModals.basket].isDisabled = app.model.basket.size === 0;
	modal[AppStateModals.basket].total = app.model.totalLabel;
});

app.on(AppStateChanges.counter, () => {
	page.counter = app.model.basket.size;
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
		isDisabled: !app.model.contactsData?.email && !app.model.contactsData?.phone,
	});
});

app.on(AppStateChanges.contacts, () => {
	modal[AppStateModals.contacts].data = app.model.contactsData;
});

app.on(AppStateModals.success, () => {
	modal[AppStateModals.success].render({
		data: { totalDescription: app.model.totalLabel },
		isActive: true,
	});
});