// Route localhost/users/add

import React, {Component} from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';


let Parse = require('parse');
Parse.initialize("TestTaskApplTcVXkSPuZpMsSKccGIN0TLlq0hcq");
Parse.serverURL = 'http://localhost/parse';
let Towns = Parse.Object.extend("Town");
let query = new Parse.Query(Towns);
let Users = Parse.Object.extend("Users");
let users;

export default class AddUser extends Component {
    constructor(props) {
    super(props);
    this.state = {
        successBar:false,
        invalidNameBar:false,
        invalidEmailBar:false,
        value: 1,
        name:'',
        email:'',
        towns:[]
    };
  }
    handleChange = (event, index, value) => this.setState({value:value});
    
    changeName() {
     this.setState({
       name:this.refs.name.getValue()
     });
    }

    changeEmail() {
     this.setState({
       email:this.refs.email.getValue()
     });
    }
    
    saveUser(){
      users = new Users();
      let name = this.state.name;
      let email = this.state.email;
      let town = this.state.towns[this.state.value-1].id;
      console.log(town);
      let townId = Towns.createWithoutData(town.id);
      let isValidEmail = this.validateEmail(email);
      if(!isValidEmail){
        //console.log('validation ', isValidEmail);
        this.setState({invalidEmailBar: true});
      } else if(name && name !== ''){
        users.set("name",this.state.name);
        users.set("email",this.state.email);
        users.set("Town",townId);
        users.save()
        .then(resolve => {
          this.setState({successBar: true, name: '', email: ''});
        })
        .catch(err => console.log('ERROR ',err));
      }else{
        this.setState({invalidNameBar: true});
      }
    }

    closeSuccessSavedBar(){
      this.setState({successBar:false});
    }

    closeInvalidEmailBar(){
      this.setState({invalidEmailBar: false});
    }

    closeinvalidNameBar(){
      this.setState({invalidNameBar:false});
    }

    componentDidMount(){
      return query.find()
      .then(resolve =>  this.setState({towns:resolve.filter(town => town.get('name'))}));
    }

    validateEmail(email) {
      email = email.trim();
      var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexp.test(email);
    }
    
    render() {
        return (
            <div>
            
            <Link to={'/users'}>
			<RaisedButton label="back to userlist" 
										primary={true}/>
			</Link>
            <div style={{textAlign:'center',minWidth:1000}}>
    <h2>Here you can add new user</h2>
    <TextField
    value={this.state.name}
    floatingLabelText="Username"
    ref="name"
    onChange={this.changeName.bind(this)}  
    />
    <span style={{margin:9}}>   </span>
    <TextField
    value={this.state.email}
     floatingLabelText="Email"
     ref="email"
     onChange={this.changeEmail.bind(this)}  
    />
   <DropDownMenu value={this.state.value} 
   onChange={this.handleChange} 
   style={{height:64,width:200}}
   >
    {this.state.towns.map((town, i) => 
        <MenuItem key={i} value={i+1} primaryText={town.get("name")}/>)
    }
   </DropDownMenu>
    <RaisedButton label="Add" 
                  primary={true} 
                  style={{align:'right'}}
                  onTouchTap={this.saveUser.bind(this)}/>
   <Snackbar
          open={this.state.successBar}
          message="User was saved to database"
          autoHideDuration={2500}
          onRequestClose={this.closeSuccessSavedBar.bind(this)}
        />
  <Snackbar
    open={this.state.invalidNameBar}
    message="Invalid name of user"
    autoHideDuration={2500}
    onRequestClose={this.closeinvalidNameBar.bind(this)}
  />
  <Snackbar
    open={this.state.invalidEmailBar}
    message="Invalid email"
    autoHideDuration={2500}
    onRequestClose={this.closeInvalidEmailBar.bind(this)}
  />
  </div>
  </div>
        );
    }
};