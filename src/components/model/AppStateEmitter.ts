import { AppState, AppStateChanges, AppStateConstructor, AppStateModals, AppStateSettings } from "../../types/components/model/AppState";
import { EventEmitter } from "../base/EventEmitter";
import { IProductAPI } from "@app/types/components/model/ProductApi";


export class AppStateEmitter extends EventEmitter {
	public model: AppState;
	protected previousModal: AppStateModals = AppStateModals.none;

	constructor(
		api: IProductAPI,
		settings: Omit<AppStateSettings, 'onChange'>,
		Model: AppStateConstructor
	) {
		super();

		this.model = new Model({
			...settings,
			onChange: this.onModelChange.bind(this),
		});
	}

	protected onModelChange(changed: AppStateChanges) {
		if (changed === AppStateChanges.modal) {
			this.emit(changed, {
				previous: this.previousModal,
				current: this.model.openedModal,
			});
			this.emit(this.model.openedModal, {});
		} else {
			this.emit(changed, {});
		}
		this.previousModal = this.model.openedModal;
	}
}