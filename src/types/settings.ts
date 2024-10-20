import { ElementCreator } from "./html";

export interface Settings {
	gallerySelector: string;
	gallerySettings: {
		activeItemClass: string;
		itemClass: string;
	};
	categoryClasses: {
		base: string,
    soft: string,
    hard: string,
    other: string,
    additional: string,
		button: string,
  },
	cardSettings: {
		category: string,
		title: string,
		image: string,
		price: string,
	};
	modalTemplate: string;
	modalSettings: {
		close: string;
		title: string;
		content: string;
		actions: string;
		activeClass: string;
		messageErrorClass: string;
	};
	cardCatalog: string;
	pricelessTotalLabel: string;
	appState: {
		storageKey: string;
	};
	modal: {
		headerTitle: string;
		submitLabel: string;
		submitSettings: ElementCreator;
		totalLabel: string;
	};
	pageSelector: string;
	pageSettings: {
		wrapper: string;
		counter: string;
		basket: string;
		lockedClass: string;
	};
	productViewElement: string,
	productViewSettings: {
		image: string,
		title: string,
		description: string,
		category: string,
		price: string,
		submitButton: string,
	},
	basketTemplate: string;
	basketModal: {
		submitLabel: string;
		submitButton: string;
		total: string;
		itemClass: string;
	};
	basketCardsContainerSelector: string;
	basketElementTemplate: string;
  basketElementSettings: {
		index: string;
		title: string;
		price: string;
		deleteButton: string;
	};
	orderTemplate: string;
	orderSettings: {
		cardButton: string;
		cashButton: string;
		address: string;
		submitButton: string;
	};
	contactsTemplate: string;
  contactsSettings: {
		email: string;
		phone: string;
    submitButton: string;
	};
	successTemplate: string,
  successSettings: {
		description: string,
    submitButton: string,
	},
}