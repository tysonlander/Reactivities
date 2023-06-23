import { makeAutoObservable } from "mobx";

// types
import { MenuProps } from 'types/menu';

// initial state
// const initialState: MenuProps = {
//     openItem: ['dashboard'],
//     openComponent: 'buttons',
//     selectedID: null,
//     drawerOpen: false,
//     componentDrawerOpen: true,
//     menu: {},
//     error: null
// };

export default class MenuStore {
    openItem = ['dashboard'];
    openComponent = 'buttons';
    selectedID = null;
    drawerOpen = false;
    componentDrawerOpen = true;
    menu = {};
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setOpenItem = (openItem: any) => {
        this.openItem = openItem;
    };
    setSelectID = (selectedID: any) => {
        this.selectedID = selectedID;
    };
    setDrawerOpen = (drawerOpen: any) => {
        this.drawerOpen = drawerOpen;
    };


}