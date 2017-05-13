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
query.find()
.then(resolve => {
  resolve.forEach(user => {
	 		let name = user.get("name");
				console.log("Id ", user.id);
				console.log("Name ", name);
				console.log("Email ", user.get('email'));
				console.log("Town ", user.get('Town').get('name'));
			
		});
			
})
.catch(err=>{
    console.log('ERR::::', err);
})

export default class UsersList extends Component {
    render() {
        return (
            <h1 style={styles.indexPage} >
                Users
            </h1>
        );
    }
};