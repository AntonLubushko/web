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
        openBar:false,
        errorBar:false,
        value: 1,
        name:'',
        email:'',
        towns:[]
    };
  }
    handleChange = (event, index, value) => this.setState({value:value});
    
    changeName = () => {
     this.setState({
       name:this.refs.name.getValue()
     });
    }

    changeEmail = () => {
     this.setState({
       email:this.refs.email.getValue()
     });
    }
    
    saveUser(){
      users = new Users();
      let name = this.state.name;
      let email = this.state.email;
      let town = this.state.towns[this.state.value-1].id||'';
      let townId = Towns.createWithoutData(this.state.towns[this.state.value-1].id);
      if(name && name !== '' && email && email !== ''){
        users.set("name",this.state.name);
        users.set("email",this.state.email);
        users.set("Town",townId);
        users.save()
        .then(resolve => {
          console.log('new user was saved');
          this.setState({openBar: true});})
        .catch(err => console.log('ERROR ',err));
    }else{
      this.setState({errorBar: true});
    }
       
    }

    closeSuccessSavedBar(){
      this.setState({openBar:false});
    }

    closeErrorBar(){
      this.setState({errorBar:false});
    }

    componentDidMount(){
      return query.find()
      .then(resolve =>  this.setState({towns:resolve}) )
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
    floatingLabelText="Username"
    ref="name"
    onChange={this.changeName.bind(this)}  
    />
    <span style={{margin:9}}>   </span>
    <TextField
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
          open={this.state.openBar}
          message="User was saved to database"
          autoHideDuration={2500}
          onRequestClose={this.closeSuccessSavedBar.bind(this)}
        />
  <Snackbar
    open={this.state.errorBar}
    message="Not all fields are fullfilled"
    autoHideDuration={2500}
    onRequestClose={this.closeErrorBar.bind(this)}
  />
  </div>
  </div>
        );
    }
};