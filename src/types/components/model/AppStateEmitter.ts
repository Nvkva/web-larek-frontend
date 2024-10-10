
// Для корректной обработки событий открытия и закрытия модальных окон

import { AppStateModals } from "./AppState";

// нам нужно знать предыдущее и текущее состояние.
export type ModalChange = {
	previous: AppStateModals;
	current: AppStateModals;
};
