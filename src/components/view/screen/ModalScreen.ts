import { Screen } from "@app/components/base/Screen";
import { ModalScreenSettings } from "@app/types/components/view/screen/ModalScreen";
import { ModalView } from "../common/Modal";
import { IView } from "@app/types/components/base/View";
import { SETTINGS } from "@app/utils/constants";
import { ensureElement } from "@app/utils/utils";

/**
 * Общая логика и структура модальных окон
 */
export abstract class ModalScreen<
	M, // внутренние данные для контента модального окна
	C, // внешние данные для экрана
	S extends ModalScreenSettings<M> // настройки экрана (обработчики событий
> extends Screen<C, S> {
	// модальное окно
	protected declare modal: ModalView<M>;

	abstract initContent(): IView<M>;

	// Переопределенный init() для инициализации модального окна
	protected init() {
		this.modal = this.settings.modalView;
		this.element = this.modal.element;
	}

	set content(value: M) {
		this.modal.content = value;
	}

	set isActive(value: boolean) {
		this.modal.isActive = value;
	}
}
