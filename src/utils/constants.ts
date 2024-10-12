import { Settings } from "@app/types/settings";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS: Settings = {
  gallerySelector: '.gallery',
  gallerySettings: {
		activeItemClass: 'gallery__item_active',
		itemClass: 'gallery__item',
	},
  cardSettings: {
		category: '.card__category',
		categorySoft: '.card__category_soft',
    title: '.card__title',
    image: '.card__image',
    price: '.card__price',
	},
  cardCatalog: '#card-catalog',
  appState: {
		storageKey: '__filmTickets',
	},
  modalTemplate: '#modal-container',
	modalSettings: {
		close: '.modal__close',
		title: '.modal__title',
		content: '.modal__content',
		actions: '.modal__actions',
		activeClass: 'modal_active',
		messageErrorClass: 'modal__message_error',
	},
  modal: {
		headerTitle: 'Корзина',
		submitLabel: 'Оформить',
		submitSettings: ['button', { className: 'button' }],
		totalLabel: 'Итого:',
	},
  pageSelector: '.page',
  pageSettings: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		basket: '.header__basket',
		lockedClass: 'page__wrapper_locked',
	},
  productViewElement: '#card-preview',
	productViewSettings: {
		image: '.card__image',
		title: '.card__title',
		description: '.card__text',
		category: '.card__category',
		price: '.card__price',
    submitButton: '.card__button'
	},
};
