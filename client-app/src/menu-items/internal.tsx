// type
import { NavItemType } from 'types/menu';

// assets
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

// ==============================|| MENU ITEMS - INTERNAL ||============================== //

const internal: NavItemType = {
    id: 'group-applications',
    title: 'Service Hub',
    icon: StoreRoundedIcon,
    type: 'group',
    children: [

        {
            id: 'kanban',
            title: 'Company',
            type: 'item',
            icon: StoreRoundedIcon,
            url: '/sample-page'
        },
        {
            id: 'customer',
            title: 'Companies',
            type: 'collapse',
            icon: StoreRoundedIcon,
            children: [
                {
                    id: 'create-company',
                    title: 'Create Company', // this shows up as the menu & page title
                    type: 'item',
                    url: '/service-hub/company/create',
                    breadcrumbs: true // this determines if the bradcrumbs & title is shown
                },
                {
                    id: 'list-company',
                    title: 'List Companies', // this shows up as the menu & page title
                    type: 'item',
                    url: '/service-hub/company/list',
                    breadcrumbs: true // this determines if the bradcrumbs & title is shown
                }

            ]
        },

    ]
};

export default internal;
