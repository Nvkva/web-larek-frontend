import { View } from "@app/components/base/View";
import { ModalData, ModalSettings } from "@app/types/components/view/common/Modal";

/**
 * Отображение модального окна
 */
export class ModalView<C> extends View<
	ModalData<C>,
	ModalSettings<C>
> {
	// модальное окно, которое сейчас открыто, оно всегда одно
	protected static _openedModal: ModalView<unknown> | null;

	protected init() {
		// слушаем клик по иконке закрыть
		this.ensure(this.settings.close).addEventListener(
			'click',
			this.onCloseHandler.bind(this)
		);
		// клик по оверлею тоже закрывает модальное окно
		this.element.addEventListener('click', this.onCloseHandler.bind(this));
		// // добавляем в подвал кнопки из настроек
		// this.ensure(this.settings.footer).prepend(...this.settings.actions);
	}

	protected onCloseHandler(event?: MouseEvent) {
		if (
			event &&
			// при повторном вызове ensure возвращает элемент из кеша
			![this.ensure(this.settings.close), this.element].includes(
				event.target as HTMLElement
			)
		)
			return;
		this.element.remove();
		this.element.classList.remove(this.settings.activeClass);
		if (event) {
			this.settings.onClose?.();
		}
		if (ModalView._openedModal === this) {
			// если закрывается текущее модальное окно, то обнуляем статическое поле
			ModalView._openedModal = null;
		}
	}

	protected onOpenHandler() {
		if (ModalView._openedModal) {
			ModalView._openedModal.isActive = false;
		}
		ModalView._openedModal = this;
		this.element.classList.add(this.settings.activeClass);
		document.body.append(this.element);
		this.settings.onOpen?.();
	}

	// Проброс данных во вложенные отображения
	set title(visibility: boolean) {
		this.setVisibility(this.settings.title, visibility);
	}

	set content(data: C) {
		this.setValue(
			this.settings.content,
			this.settings.contentView.render(data)
		);
	}

	// Открытие и закрытие модального окна
	set isActive(state: boolean) {
		if (state) {
			this.element.classList.add(this.settings.activeClass);
			this.onOpenHandler();
		} else {
			this.element.classList.remove(this.settings.activeClass);
			this.onCloseHandler();
		}
	}
}