import React, {Component} from 'react';

const styles = {
    indexPage: {textAlign: 'center'},
};

// Initialize a parse-server
let Parse = require('parse');
Parse.initialize("TestTaskApplTcVXkSPuZpMsSKccGIN0TLlq0hcq");
Parse.serverURL = 'http://localhost/parse';

// Fetching all users with all fields and print to console
let Users = Parse.Object.extend("Users");
let query = new Parse.Query(Users).include(['Town']);
// query.find()
// .then(resolve => {
//   resolve.forEach(user => {
// 	 		let name = user.get("name");
// 				console.log("Id ", user.id);
// 				console.log("Name ", name);
// 				console.log("Email ", user.get('email'));
// 				console.log("Town ", user.get('Town').get('name'));
			
// 		});
			
// })
// .catch(err=>{
//     console.log('ERR::::', err);
// })

export default class UsersList extends Component {

constructor(props){
	super(props);
	this.state = {
		array: [],
	}
}

componentDidMount(){
		
		return query.find()
		.then(resolve => {
			let array = resolve;
			this.setState({array});
})
}


	render() {
let all = [];
for(let i = 0; i < this.state.array.length;  i++){

	let name =  this.state.array[i]? this.state.array[i].get("name") : '';
	let email =  this.state.array[i]? this.state.array[i].get("email") : '';
	let town =  this.state.array[i]? this.state.array[i].get("Town").get("name") : '';
	all.push([name, email, town]);
}
console.log(all);


// this return must be finished
return (
		<div>
		{all.map( (user, i) => <p key = {i}>{user.name}</p>)}
		
		</div>
	);


}
};