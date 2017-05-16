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

// Initialize a parse-server
let Parse = require('parse');
Parse.initialize("TestTaskApplTcVXkSPuZpMsSKccGIN0TLlq0hcq");
Parse.serverURL = 'http://localhost/parse';

// Fetching all users with all fields and print to console
let Users = Parse.Object.extend("Users");
let query = new Parse.Query(Users).include(['Town']);
const SHOWN_USERS = 10;
export default class UsersList extends Component {

constructor(props){
	super(props);
	this.state = {
		array: [],
    usersToDisplay:[],
    totalPages:1,
    currentPage:1
	}
}


componentDidMount(){
	return query.find()
	.then(resolve => {
		let array = resolve;
		this.setState({array:array, totalPages:Math.ceil(array.length/10)});
    
  })
  .then( () => this.setState({usersToDisplay:calculate(this.currentPage)}));
}

calculate(value){
  let usersToDisplay = [];
  let array = this.state.array;
  let amount = Math.min(value*SHOWN_USERS,array.length);
  for(let i = (value-1)*SHOWN_USERS; i < amount; i++){
    let id =  array[i]? array[i].id : '';
    let name =  array[i]? array[i].get("name") : '';
    let email =  array[i]? array[i].get("email") : '';
    let town =  array[i]? array[i].get("Town").get("name") : '';
    usersToDisplay.push([id, name, email, town]);
  }
  return usersToDisplay;
}

changeShownUsers = (value )=> {
  console.log(value);
  let usersToDisplay = this.calculate(value);
  this.setState({usersToDisplay:usersToDisplay,currentPage:value});
}

updateUser(action, user){
	console.log(action, user);
}
deleteUser(action, user){
	console.log(action, user);
}

render() {
  console.log(this.state.usersToDisplay);
let all = this.state.usersToDisplay;
return (
		<div style={{minWidth:1000}}>
			<Link to={'/users/add'}>
			<RaisedButton label="Add new user" 
										primary={true} 
										style={style}/>
			</Link>
			<Table  selectable={false}>
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
      <Divider/>
			<Pagination total={this.state.totalPages} display={SHOWN_USERS} current={this.state.currentPage} onChange={this.changeShownUsers}/>
		</div>
	);


}
};