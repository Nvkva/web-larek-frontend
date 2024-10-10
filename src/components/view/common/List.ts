import { View } from "@app/components/base/View";
import { ElementsMap, ItemData, ListData, ListSettings } from "@app/types/components/view/common/List";

/**
 * Класс для отображения списка элементов
 */
export class ListView<T extends ItemData> extends View<
	ListData<T>,
	ListSettings<T>
> {
	// Сохраняем элементы в объекте, где ключ - id элемента
	protected _elements: ElementsMap;

	/**
	 * Обновляем отображение списка элементов
	 */
	set items(items: T[]) {
		this._elements = items.reduce<ElementsMap>((result, item) => {
			// Копируем заранее настроенное отображение
			const el = this.settings.item.copy();
			// Добавляем класс элемента
			el.element.classList.add(this.settings.itemClass);
			// Заполняем нужными данными и сохраняем в объекте
			result[item.id] = el.render(item);
			return result;
		}, {});
		this.setValue(this.element, Object.values(this._elements));
	}
}