import { ModalView } from "@app/components/view/common/Modal";

export interface ModalScreenData {
	isDisabled: boolean;
	isActive: boolean;
}

export interface ModalScreenSettings<M> {
	onClose: () => void;
	onSubmit: (data?: any) => void;
	modalView: ModalView<M>
}
