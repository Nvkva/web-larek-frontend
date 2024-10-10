import { Screen } from "@app/components/base/Screen";
import { ModalScreenSettings } from "@app/types/components/view/screen/ModalScreen";
import { ModalView } from "../common/Modal";
import { IView } from "@app/types/components/base/View";
import { SETTINGS } from "@app/utils/constants";
import { ElementCreator } from "@app/types/html";
import { cloneTemplate, ensureElement } from "@app/utils/utils";
import { ButtonView } from "../common/Button";

/**
 * Общая логика и структура модальных окон
 */
export abstract class ModalScreen<
	M, // внутренние данные для контента модального окна
	C, // внешние данные для экрана
	S extends ModalScreenSettings // настройки экрана (обработчики событий
> extends Screen<C, S> {
	// модальное окно
	protected declare modal: ModalView<M>;
	// кнопка подтверждения
	protected declare submitButton: HTMLButtonElement;

	abstract initContent(): IView<M>;

	// Переопределенный init() для инициализации модального окна
	protected init() {
		this.submitButton = this.getSubmitButton(
			SETTINGS.modal,
			this.settings.onSubmit
		);

		this.modal = this.getModalView(
			{
				contentView: this.initContent(),
			},
			this.settings.onClose
		);

		this.element = this.modal.element;
	}

	// Вспомогательные методы

	protected getSubmitButton(
		settings: { submitLabel: string; submitSettings: ElementCreator },
		onClick: () => void
	) {
		return ButtonView.make<HTMLButtonElement>(
			settings.submitLabel,
			settings.submitSettings,
			onClick
		);
	}

	protected getModalView(
		settings: { contentView: IView<M> },
		onClose: () => void
	) {
		return new ModalView<M>(ensureElement(SETTINGS.modalTemplate), {
			...SETTINGS.modalSettings,
			...settings,
			onClose,
		});
	}

	// Методы установки данных

	set content(value: M) {
		this.modal.content = value;
	}

	set isActive(value: boolean) {
		this.modal.isActive = value;
	}

	set isDisabled(state: boolean) {
		this.submitButton.disabled = state;
	}
}
