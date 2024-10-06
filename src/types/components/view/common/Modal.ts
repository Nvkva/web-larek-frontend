import { IView } from "../../base/View";

export interface ModalData<C> {
	content: C;
	isActive: boolean;
}

export interface ModalSettings<C> {
	close: string;
	title: string;
	content: string;
	actions: string;
	contentView: IView<C>;
	activeClass: string;
	onOpen?: () => void;
	onClose?: () => void;
}
