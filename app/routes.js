
import {checkAdminAccess, checkUserAccess} from './utils/access';

import Layout from './layout/Main.jsx';

import IndexPage from './index/Index.jsx';
import Login from './index/Login.jsx';
import SignUp from './index/SignUp.jsx';
import NotFound from './index/404.jsx';


import UserRoutes from './modules/user/routes';


export default [
    {
        path: '/',
        component: Layout,
        indexRoute: {
            component: IndexPage
        },
        childRoutes: [
            {
                path: 'signUp',
                component: SignUp
            },
            {
                path: 'login',
                component: Login
            },
            Object.assign( UserRoutes, { onEnter: checkUserAccess }),
            {
                path: '*',
                indexRoute: {
                    component: NotFound
                }
            }

        ]

    }
]