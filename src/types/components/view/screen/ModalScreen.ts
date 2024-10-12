export interface ModalScreenData {
	isDisabled: boolean;
	isActive: boolean;
}

export interface ModalScreenSettings {
	onClose: () => void;
	onSubmit: (data?: any) => void;
}
