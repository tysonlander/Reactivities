import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";
import SnackbarStore from "./snackbarStore";
import MenuStore from "./menuStore";
import AuthStore from "./authStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
    snackbarStore: SnackbarStore;
    menuStore: MenuStore;
    authStore: AuthStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    snackbarStore: new SnackbarStore(),
    menuStore: new MenuStore(),
    authStore: new AuthStore(),

};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}