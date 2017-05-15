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
const style = {
  margin: 2,
};

// Initialize a parse-server
let Parse = require('parse');
Parse.initialize("TestTaskApplTcVXkSPuZpMsSKccGIN0TLlq0hcq");
Parse.serverURL = 'http://localhost/parse';

// Fetching all users with all fields and print to console
let Users = Parse.Object.extend("Users");
let query = new Parse.Query(Users).include(['Town']);

export default class UsersList extends Component {

constructor(props){
	super(props);
	this.state = {
		array: []
	}
}

componentDidMount(){
	return query.find()
	.then(resolve => {
		let array = resolve;
		this.setState({array});
		
	});
}

updateUser(action, user){
	console.log(action, user);
}
deleteUser(action, user){
	console.log(action, user);
}
addUser(action){
	console.log(action);
}
render() {
let all = this.state.array.map(user => {
	let id =  user? user.id : '';
	let name =  user? user.get("name") : '';
	let email =  user? user.get("email") : '';
	let town =  user? user.get("Town").get("name") : '';
	return [id, name, email, town];
});

return (
		<div>
			<Link to={'/users/add'}>
			<RaisedButton label="Add new user" 
										primary={true} 
										style={style} 
										onTouchTap={this.addUser.bind(this,'add')}/>
			</Link>
			<Table height={'200px'} selectable={false}>
			<TableHeader displaySelectAll={false} 
									 adjustForCheckbox={false}
            			 enableSelectAll={false}
									 >
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
        <TableHeaderColumn>Town</TableHeaderColumn>
				<TableHeaderColumn></TableHeaderColumn>
				<TableHeaderColumn></TableHeaderColumn>
      </TableRow>
    </TableHeader>
			<TableBody showRowHover={false} displayRowCheckbox={false}>
			{all.map((user,i) => 
				<TableRow key={i}>
					<TableRowColumn>{user[1]}</TableRowColumn>
					<TableRowColumn>{user[2]}</TableRowColumn>
					<TableRowColumn>{user[3]}</TableRowColumn>
					<TableRowColumn><RaisedButton label="Update" primary={true} style={style} onTouchTap={this.updateUser.bind(this,'update',user)}/></TableRowColumn>
					<TableRowColumn><RaisedButton label="Delete" primary={true} style={style} onTouchTap={this.deleteUser.bind(this,'delete',user)}/></TableRowColumn>
        </TableRow>
			)}
			</TableBody>
			</Table>
		</div>
	);


}
};