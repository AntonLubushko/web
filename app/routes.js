import Layout from './layout/Main.jsx';

import IndexPage from './index/Index.jsx';

export default [
    {
        path: '/',
        component: Layout,
        indexRoute: {
            component: IndexPage
        },
    }
]