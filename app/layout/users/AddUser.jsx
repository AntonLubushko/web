// Route localhost/users/add

import React, {Component} from 'react';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import Parse from '../../utils/parseServerInit.js';
import {saveUser, getTowns} from '../../utils/actions';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successBar:false,
      invalidNameBar:false,
      invalidEmailBar:false,
      townIndex: 1,
      name:'',
      email:'',
      towns:[]
    };
  }
  
  paginationChange(event, _ , value) {
    this.setState({townIndex: value});
  }

  changeName() {
    this.setState({name:this.refs.name.getValue()});
  }

  changeEmail() {
    this.setState({email:this.refs.email.getValue()});
  }

  save(){
     let result = saveUser(this.state.name, this.state.email, this.state.towns[this.state.townIndex-1]);
     switch(typeof result){
       case('object'): this.setState({successBar:true, name: '', email: ''});break;
       case('string'): result === 'name'?this.setState({invalidNameBar:true}):this.setState({invalidEmailBar:true});break;
     }
  }

  componentDidMount(){
     getTowns().then(towns => this.setState({towns:towns}));
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
            onChange={this.changeName.bind(this)}/>
          <span style={{margin:9}}>   </span>
          <TextField
            value={this.state.email}
            floatingLabelText="Email"
            ref="email"
            onChange={this.changeEmail.bind(this)}/>
          <DropDownMenu 
            value={this.state.townIndex} 
            onChange={this.paginationChange.bind(this)} 
            style={{height:64,width:200}}>
              {this.state.towns.map((town, i) => 
              <MenuItem key={i} value={i+1} primaryText={town.get("name")}/>)
              }
          </DropDownMenu>
          <RaisedButton 
            label="Add" 
            primary={true} 
            style={{align:'right'}}
            onTouchTap={this.save.bind(this)}/>
          <Snackbar
            open={this.state.successBar}
            message="User was saved to database"
            autoHideDuration={2500}
            onRequestClose={() => this.setState({successBar:false})}/>
          <Snackbar
            open={this.state.invalidNameBar}
            message="Invalid name of user"
            autoHideDuration={2500}
            onRequestClose={() => this.setState({invalidNameBar:false})}/>
          <Snackbar
            open={this.state.invalidEmailBar}
            message="Invalid email"
            autoHideDuration={2500}
            onRequestClose={() => this.setState({invalidEmailBar: false})}/>
        </div>
      </div>
  );}
}