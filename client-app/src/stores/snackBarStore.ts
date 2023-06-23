import { makeAutoObservable, runInAction } from "mobx";

export default class SnackBarStore {

    actionButton: any = false;
    anchorOrigin: any = false;
    
    alert: any = false;
    close: any = false;
    message: any = false;
    open: any = false;
    transition: any = false;
    variant: any = false;

    constructor() {
        makeAutoObservable(this);
    }

    closeSnackbar = () => { };
}