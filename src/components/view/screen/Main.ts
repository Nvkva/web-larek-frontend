import { Screen } from "@app/components/base/Screen";
import { CardData } from "@app/types/components/view/partial/Card";
import { MainData, MainSettings } from "@app/types/components/view/screen/Main";
import { ListView } from "../common/List";
import { cloneTemplate, ensureElement } from "@app/utils/utils";
import { SETTINGS } from "@app/utils/constants";
import { CardView } from "../partial/Card";
import { IClickableEvent } from "@app/types/components/base/View";
import { PageView } from "../partial/Page";

export class MainScreen extends Screen<MainData, MainSettings> {
  protected declare gallery: ListView<CardData>;
	public declare page: PageView;

  set items(value: CardData[]) {
		this.gallery.items = value;
	}

	protected init() {
		this.page = new PageView(ensureElement(SETTINGS.pageSelector), {
			...SETTINGS.pageSettings,
			onClick: this.settings.onOpenBasket,
		});

    this.gallery = new ListView<CardData>(
			ensureElement(SETTINGS.gallerySelector),
			{
				...SETTINGS.gallerySettings,
				item: new CardView(cloneTemplate(SETTINGS.cardCatalog), {
					...SETTINGS.cardSettings,
					onClick: this.onOpenProductHandler.bind(this),
				}),
			}
		);

		this.element = this.page.element;
  }
  protected onOpenProductHandler({ item }: IClickableEvent<string>) {
		this.settings.onOpenProduct(item);
	}
}