import { IClickable } from "@app/types/components/base/View";

export interface HeaderData {
	title: string;
}

export interface HeaderSettings extends IClickable<never> {
	title: string;
}
