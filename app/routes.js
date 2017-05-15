// Routes
'use strict'
import Layout from './layout/Main.jsx';
import IndexPage from './index/Index.jsx';
import UsersList from './layout/users/UsersList.jsx';
import AddUser from './layout/users/AddUser.jsx';

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
	},
	{
		path: '/users/add',
		component: Layout,
		indexRoute: {
			component: AddUser
		}
	}
]