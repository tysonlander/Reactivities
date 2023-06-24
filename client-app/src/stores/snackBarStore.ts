import { makeAutoObservable, runInAction } from "mobx";
import { SnackbarProps } from 'types/snackbar';

interface SnackbarActionProps {
    open?: boolean;
    message?: string;
    anchorOrigin?: any;
    variant?: string;
    alert?: any;
    transition?: string;
    close?: boolean;
    actionButton?: boolean;

}



// example openSnackbarPayload
// {
//     message: 'Check mail for reset password link',
//     variant: 'alert',
//     alert: {
//         color: 'success';
//     },
//     close: false;
// }

// types


const initialState: SnackbarProps = {
    action: false,
    open: false,
    message: 'Note archived',
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
    },
    variant: 'default',
    alert: {
        color: 'primary',
        variant: 'filled'
    },
    transition: 'Fade',
    close: true,
    actionButton: false,
    maxStack: 3,
    dense: false,
    iconVariant: 'usedefault'
};

export default class SnackbarStore {


    // actionButton: any = false;
    // anchorOrigin: any = false;

    // alert: any = false;
    // close: any = false;
    // message: any = false;
    // open: any = false;
    // transition: any = false;
    // variant: any = false;

    action: boolean = initialState.action;
    open: boolean = initialState.open;
    message: string = initialState.message;
    anchorOrigin: any = initialState.anchorOrigin;
    variant: string = initialState.variant;
    alert: any = initialState.alert;
    transition: string = initialState.transition;
    close: boolean = initialState.close;
    actionButton: boolean = initialState.actionButton;
    maxStack: number = initialState.maxStack;
    dense: boolean = initialState.dense;
    iconVariant: string = initialState.iconVariant;

    constructor() {
        makeAutoObservable(this);
    }

    closeSnackbar = () => { };

    openSnackbar = (payload: SnackbarActionProps) => {
        const { open, message, anchorOrigin, variant, alert, transition, close, actionButton } = payload;
        this.action = !this.action;
        this.open = open || initialState.open;
        this.message = message || initialState.message;
        this.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
        this.variant = variant || initialState.variant;
        this.alert = {
            color: alert?.color || initialState.alert.color,
            variant: alert?.variant || initialState.alert.variant
        };
        this.transition = transition || initialState.transition;
        this.close = close === false ? close : initialState.close;
        this.actionButton = actionButton || initialState.actionButton;
    };
}