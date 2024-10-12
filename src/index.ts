import { MainController } from './components/controller/Main';
import { ProductViewController } from './components/controller/ProductViewController';
import { AppStateModel } from './components/model/AppState';
import { AppStateEmitter } from './components/model/AppStateEmitter';
import { ProductAPI } from './components/model/ProductApi';
import { MainScreen } from './components/view/screen/Main';
import { ProductViewScreen } from './components/view/screen/ProductView';
import './scss/styles.scss';
import { AppStateChanges, AppStateModals } from './types/components/model/AppState';
import { ModalChange } from './types/components/model/AppStateEmitter';
import { API_URL, CDN_URL, SETTINGS } from './utils/constants';

const api = new ProductAPI(CDN_URL, API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppStateModel);
const main = new MainScreen(new MainController(app.model, api));
const modal = {
	[AppStateModals.productView]: new ProductViewScreen(
		new ProductViewController(app.model, api)
	),
  [AppStateModals.basket]: new ProductViewScreen(
		new ProductViewController(app.model)
	),
	[AppStateModals.contacts]: new ProductViewScreen(
		new ProductViewController(app.model)
	),
	[AppStateModals.success]: new ProductViewScreen(
		new ProductViewController(app.model)
	),
	[AppStateModals.none]: new ProductViewScreen(
		new ProductViewController(app.model)
	),
};

app.on(AppStateChanges.products, () => {
	main.items = Array.from(app.model.products.values());
});

app.on(AppStateModals.productView, () => {
	modal[AppStateModals.productView].render({
		product: app.model.selectedProduct,
		isActive: true,
	});
});

app.on(AppStateChanges.modal, ({ previous, current }: ModalChange) => {
	main.page.isLocked = current !== AppStateModals.none;
	if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
	}
});
