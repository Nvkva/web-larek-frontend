import { Settings } from "@app/types/settings";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS: Settings = {
  gallerySelector: '.gallery',
  gallerySettings: {
    activeItemClass: 'gallery__item_active',
    itemClass: 'gallery__item',
  },
  categoryClasses: {
    base: 'card__category',
    soft: 'card__category_soft',
    hard: 'card__category_hard',
    other: 'card__category_other',
    additional: 'card__category_additional',
    button: 'card__category_button',
  },
  cardSettings: {
    category: '.card__category',
    title: '.card__title',
    image: '.card__image',
    price: '.card__price',
  },
  cardCatalog: '#card-catalog',
  nullPriceLabel: 'Бесценно',
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
  basketTemplate: '#basket',
  basketModal: {
    submitLabel: 'Оформить',
    submitButton: '.basket__button',
    total: '.basket__price',
    itemClass: "basket__item",
  },
  basketElementTemplate: '#card-basket',
  basketElementSettings: {
    index: ".basket__item-index",
    title: ".card__title",
    price: ".card__price",
    deleteButton: ".basket__item-delete",
  },
  basketCardsContainerSelector: ".basket__list",
  orderTemplate: '#order',
  orderSettings: {
		cardButton: 'button[name=card]',
		cashButton: 'button[name=cash]',
		address: 'input[name=address]',
    submitButton: '.order__button',
	},
  contactsTemplate: '#contacts',
  contactsSettings: {
		email: 'input[name=email]',
		phone: 'input[name=phone]',
    submitButton: '.contacts__button',
	},
  successTemplate: '#success',
  successSettings: {
		description: '.order-success__description',
    submitButton: '.order-success__close',
	},
};
