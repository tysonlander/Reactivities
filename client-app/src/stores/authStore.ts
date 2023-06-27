import { makeAutoObservable } from "mobx";


export default class AuthStore {
    isLoggedIn = false;
    isInitialized = false;
    user = null;

    constructor() {
        makeAutoObservable(this);
    }


    setLoggedInUser = (user: any) => {
        this.user = user;
        this.isLoggedIn = true;
        this.isInitialized = true;

        console.log('authStore isLoggedIn set to:', this.isLoggedIn);
    };
    removeLoggedInUser = () => {
        this.user = null;
        this.isLoggedIn = false;
        this.isInitialized = true;
    };



}