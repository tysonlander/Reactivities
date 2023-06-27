import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../app/models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction( // this will not run when the store is initialized only when the value of 'token' changes
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token);
                } else {
                    localStorage.removeItem('jwt');
                }
            }
        );
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        // if (token) localStorage.setItem('jwt', token);
        this.token = token;
    };

    setAppLoaded = () => {
        this.appLoaded = true;
    };
}