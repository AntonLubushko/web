// Route localhost/users

import React, {Component} from 'react';
import User from './User.jsx';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import Pagination from 'material-ui-pagination';
import Divider from 'material-ui/Divider';
const style = {
  margin: 2,
};

import {showUsersList, countUsers} from '../../utils/actions';


const SHOWN_USERS = 10;


export default class UsersList extends Component {

	constructor(props){
		super(props);
		this.state = {
			usersToDisplay:[],
			totalPages:1,
			currentPage:1
		}
	}
	fetchData(){
		countUsers().then(amount =>  this.setState({totalPages:Math.ceil(amount/10)}));
		showUsersList(0, SHOWN_USERS).then(users => {
			this.setState({usersToDisplay: users});
		});
	}

	componentDidMount(){
		this.fetchData();
	}

	updateUser(action, user){
		console.log(action, user);
	}
	deleteUser(action, user){
		console.log(action, user);
		this.fetchData();
	}

	changeShowingUsers(value){
		showUsersList((value-1)*SHOWN_USERS, SHOWN_USERS).then(users => {
			this.setState({usersToDisplay: users,currentPage:value});
		});
	}
	render() {
		return (
			<div style={{minWidth:1000}}>
				<Link to={'/users/add'}>
					<RaisedButton label="Add new user" 
												primary={true} 
												style={style}/>
				</Link>
				<Table selectable={false}>
					<TableHeader displaySelectAll={false} 
											adjustForCheckbox={false}
											enableSelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Email</TableHeaderColumn>
							<TableHeaderColumn>Town</TableHeaderColumn>
							<TableHeaderColumn></TableHeaderColumn>
							<TableHeaderColumn></TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody showRowHover={false} displayRowCheckbox={false}>
						{this.state.usersToDisplay.map((user, i) => 
							{return <TableRow key={i}>
								<TableRowColumn>{user.get('name')}</TableRowColumn>
								<TableRowColumn>{user.get('email')}</TableRowColumn>
								<TableRowColumn>{user.get('Town')?user.get('Town').get('name'):''}</TableRowColumn>
								<TableRowColumn>
									<RaisedButton label="Update" 
																primary={true} style={style} 
																onTouchTap={this.updateUser.bind(this, 'update', user)}/>
								</TableRowColumn>
								<TableRowColumn>
									<RaisedButton label="Delete" 
																primary={true} style={style} 
																onTouchTap={this.deleteUser.bind(this,'delete',user)}/>
								</TableRowColumn>
							</TableRow>}
						)}
					</TableBody>
				</Table>
				<Divider/>
				<Pagination total={this.state.totalPages} 
										display={SHOWN_USERS} 
										current={this.state.currentPage} 
										onChange={this.changeShowingUsers.bind(this)}/>
			</div>
	);}
};