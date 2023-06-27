// type
import { NavItemType } from 'types/menu';

// assets
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

// ==============================|| MENU ITEMS - INTERNAL ||============================== //

const internal: NavItemType = {
    id: 'group-applications',
    title: 'Company',
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
            title: 'Customer',
            type: 'collapse',
            icon: StoreRoundedIcon,
            children: [
                {
                    id: 'customer-list',
                    title: 'Customer List',
                    type: 'item',
                    url: '/apps/customer/customer-list'
                },
                {
                    id: 'customer-card',
                    title: 'Customer Card',
                    type: 'item',
                    url: '/apps/customer/customer-card'
                }
            ]
        },

    ]
};

export default internal;
