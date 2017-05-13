import Layout from './layout/Main.jsx';
import IndexPage from './index/Index.jsx';
import UsersList from './layout/users/UsersList.jsx'

export default [
	{
		path: '/',
		component: Layout,
		indexRoute: {
			component: IndexPage
		}
	},
	{
		path: '/users',
		component: Layout,
		indexRoute: {
			component: UsersList
		}
	}
]