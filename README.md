# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура проекта

Для упрощения рефакторинга будет создан файл с константами для всего проекта. В нем также будут прописаны URL для доступа к API:

```typescript
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS: Settings = {
  // константы
}
```

Интерфейс можно условно разделить на 3 процесса:
1. Просмотр списка продуктов (`MainScreen`)
2. Просмотр конкретного продукта (`ProductViewScreen`)
3. Оформление заказа (`BasketScreen`, `OrderScreen`, `SuccessScreen`)

В этом проекте будет использоваться архитектурный паттерн MVC. 

Единая модель данных будет реализована приложения в файле `src/components/model/AppState.ts`, содержащая всю логику работы с данными и возможные действия над ними. Все изменения данных происходят через методы модели, а она в свою очередь уведомляет об изменениях через метод настроек `onChange(changes: AppStateChanges)` чтобы не зависеть от конкретного способа коммуникации между компонентами. Подключение модели к системе событий производится через обертку `src/components/model/AppStateEmitter.ts`.

Экземпляр модели передается в контроллеры, которые по факту являются обработчиками пользовательских действий и обновляют состояние модели через ее методы. Экземпляры контроллеров передаются в качестве объекта содержащего обработчики событий в верхнеуровневые отображения (экраны).

При обработке событий возникающих в `AppStateEmitter` производится обновление данных в верхнеуровневых отображениях. Экраны это фактически крупные сборки инкапсулирующие детали реализации интерфейса и принимающие из вне только обработчики событий и необходимые данные. Экраны внутри составлены из более мелких отображений, которые инициализируют с помощью глобальных настроек проекта и распределяют данные между вложенными отображениями через свойства и метод `render()`.

Пример цепочки взаимодействия:

```typescript
const api = new Api(); // Инициализация API
const app = new ModelEmitter(api); // Инициализация модели и событий
const screen = new Screen( // Инициализация экрана
    // экран ждет объект с обработчиками событий, например { onClick: () => void }
	new Controller( // Инициализация контроллера
        /* { // Обработчики событий
            onClick: () => {
                app.model.value += 1;
            }
        }*/
		app.model // Передача модели в контроллер
    )
);

app.on('change:value', () => {
	screen.value = app.model.value;
});

// Screen.onClick -> Controller.onClick -> Model.value -> Screen.value
```

### View (Отображения)

Общий функционал модальных окон будет вынесен в абстрактный класс `ModalScreen`. Все модальные окна наследуются от него и переопределяют методы для своей реализации.

`ModalScreen`

```typescript
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
			actionsElement: [this.submitButton],
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
```

```typescript
export abstract class Screen<T, S extends object> extends View<T, S> {
	constructor(settings: S) {
		super(null, settings);
	}
}
```

Отображения в проекте разделены на три типа:
- `common` — общие компоненты, не зависящие от доменной области проекта
- `partial` — частичные компоненты, реализующие доменную область проекта
- `screen` — верхнеуровневые компоненты, которые являются экранами приложения

Первые два типа (common и partial) независимо типизированы, не используют глобальных настроек напрямую и могут быть легко переносимы между проектами. Экраны (screen) же зависят от глобальных настроек и используют их для инициализации и передачи данных между вложенными отображениями, так как по факту это соединительный код для удобства вынесенные в отдельные файлы и оформленный как отображение.

Каждое отображение (кроме Screen) устроено следующим образом:

```typescript
class Component extends View<Тип_данных, Тип_настроек> {
    constructor(public element: HTMLElement, protected readonly settings: Settings) {
        super(element, settings);
        // Не переопределяем конструктор в своих отображениях!
    }
		
	protected init() {
        // Используем метод жизненного цикла, для инициализация компонента	
        // Здесь вешаем события
    }	

    set value(value: number) {
        // Устанавливаем поле данных "value" в верстке
    }
		
    render() {
        // Отрисовка компонента
        // Переопределяем только по необходимости
        return this.element;
    }
}
```

Если необходимо использовать в одном отображении другие, то передаем их через настройки, не создавая зависимость напрямую. Пример:

```typescript
interface ChildData {
    value: number;
}

interface ComponentData {
	content: ChildData;
}

interface ComponentSettings {
	contentView: IView<ChildData> // Ждем отображение принимающее данные типа ChildData
}

class Component extends View<Тип_данных, Тип_настроек> {
    set content(data: ChildData) {
        this.settings.contentView.render(data);
        // или this.settings.contentView.value = data.value; 
    }
}
```

Если нужно использовать переданное отображение как шаблон, то можно использовать метод `copy()` — копирующие конструктор, который создает новый экземпляр отображения с теми же настройками (но их можно переопределить через параметры метода).

Класс `Screen` выглядит следющим образом:

```typescript
export abstract class Screen<T, S extends object> extends View<T, S> {
	constructor(settings: S) {
		super(null, settings);
	}
}
```

Интерфейс базового класса `IView`:

```typescript
export interface IView<T, S = object> {
	// отображение для заданного типа данных
	element: HTMLElement; // корневой элемент
	copy(settings?: S): IView<T>; // копирующий конструктор
	render(data?: Partial<T>): HTMLElement; // метод рендера
}
```


В общем случае при создании класса отображения мы передаем HTMLElement при помощи вызовов функций из `utils.ts` (`ensureElement`, `cloneTemplate`, `createElement`)
Пример:

```typescript
this.item = new CardView(cloneTemplate(SETTINGS.cardCatalog), {
	...SETTINGS.cardSettings,
	onClick: this.onOpenProductHandler.bind(this),
}),
```

### Model (Модели)

Модели в проекте будут представлены классом `AppState`, который содержит в себе все данные и логику работы с ними. Модель частично реализует паттерн "Наблюдатель", и уведомляет об изменениях через метод `onChange(changes: AppStateChanges)`. Для удобства работы с данными в модели реализованы методы для изменения данных, которые в свою очередь вызывают метод `onChange()`.

В целом типовая модель данных выглядит следующим образом:

```typescript
enum ModelChanges {
    // Изменения в модели
    value = 'change:value'
}

interface ModelSettings {
    // Настройки модели
    onChange(changes: ModelChanges): void;
}

class Model {
    constructor(
			protected api: Api, // API для работы с данными
            protected settings: ModelSettings // Настройки и обработчики событий
    ) {
        // Инициализация модели
    }

    // Методы для изменения данных
    public changeValue(value: number) {
        // Изменение данных
        this.onChange(ModelChanges.value);
    }
}
```

### Controller (Контроллеры)

Контроллеры в проекте будут представлены классами унаследованными от `Controller`, и являются обработчиками пользовательских действий и обновляют состояние модели через ее методы. Контроллеры принимают в себя экземпляр модели и обрабатывают события, вызывая методы модели для изменения данных.

Пример контроллера:

```typescript
class Controller {
    constructor(
        protected model: Model // Модель для работы с данными
    ) {
        // Инициализация контроллера
    }

    public onClick = () => { // чтобы не потерять контекст
        // Обработка события
        this.model.changeValue();
    }
}
```

### Работа с API

Для работы с API будет создан базовый класс с общим функционалом, от которого будут наследоваться другие классы API:

```typescript
/**
 * Базовый класс для работы с API
 */
export class Api {
	readonly baseUrl: string;
	protected _options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this._options = {
			headers: {
				'Content-Type': 'application/json',
				...((options.headers as object) ?? {}),
			},
		};
	}

	protected async _handleResponse<T>(response: Response): Promise<T> {
		if (response.ok) return response.json();
		const data = (await response.json()) as ErrorState;
		return Promise.reject(data.error ?? response.statusText);
	}

	protected async _get<T>(uri: string, method = EnumApiMethods.GET) {
		const response = await fetch(this.baseUrl + uri, {
			...this._options,
			method,
		});
		return this._handleResponse<T>(response);
	}

	protected async _post<T>(
		uri: string,
		data: object,
		method = EnumApiMethods.POST
	) {
		const response = await fetch(this.baseUrl + uri, {
			...this._options,
			method,
			body: JSON.stringify(data),
		});
		return this._handleResponse<T>(response);
	}
}
```

Интерфейс для предоставленного API работы с продуктами:

```typescript
export interface IProductAPI {
  getProducts: () => Promise<Product[]>;
  getProduct: (id: string) => Promise<Product>;
  postOrder: (order: Order) => Promise<OrderResult>;
}
```
