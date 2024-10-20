import { Screen } from "@app/components/base/Screen";
import { CardData } from "@app/types/components/view/partial/Card";
import { MainData, MainSettings } from "@app/types/components/view/screen/Main";
import { ListView } from "../common/List";
import { IClickableEvent } from "@app/types/components/base/View";
import { PageView } from "../partial/Page";

export class MainScreen extends Screen<MainData, MainSettings> {
	protected declare gallery: ListView<CardData>;
	public declare page: PageView;

	set items(value: CardData[]) {
		this.gallery.items = value;
	}

	constructor(
		settings: MainSettings,
		pageComponent: PageView,
		gallery: ListView<CardData>,
	) {
		super(settings, pageComponent.element);
		this.page = pageComponent;
		this.gallery = gallery;
		this.element = this.page.element;
	}

	set counter(value: number) {
		this.page.counter = value;
	}
}