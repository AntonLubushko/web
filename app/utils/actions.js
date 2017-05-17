import Parse from './parseServerInit';
let Users = Parse.Object.extend("Users");
let Towns = Parse.Object.extend("Town");

export function countUsers(){
  let query = new Parse.Query(Users);
  return query.count();
}

export function getTowns(){
  let query = new Parse.Query(Towns);
  // need to fix this
  query.notEqualTo(" "||undefined);
  return query.find();
    
}

export function showUsersList(skip, limit){
  let query = new Parse.Query(Users).include(['Town']);
  query.skip(skip);
  query.limit(limit);
  return query.find();  
}

export function saveUser(name, email, town){
  if(!name){
    return 'name';
  }
  if(!validateEmail(email)) {
    return 'email';
  }
  let users = new Users();
  users.set("name",name);
  users.set("email",email);
  users.set("Town", town);
  return users.save();
 }

let validateEmail = (email) => {
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email.trim());
  }