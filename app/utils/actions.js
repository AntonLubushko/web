import Parse from './parseServerInit';
let Users = Parse.Object.extend("Users");
let Towns = Parse.Object.extend("Town");

export function getUsersAmount(){
  let query = new Parse.Query(Users);
  return query.count();
}

export function getTowns(){
  let query = new Parse.Query(Towns);
  let reg = /^.?$/;
  query.notEqualTo("name", null);
  return query.find();
    
}

export function getUsersList(skip, limit){
  let query = new Parse.Query(Users).include(['Town']);
  let subscription = query.subscribe();
  query.skip(skip);
  query.limit(limit);
  return query.find();  
}

export function saveUser(name, email, town){
  if(!name){
    return  Promise.reject('name');
  }
  if(!validateEmail(email)) {
    return  Promise.reject('email');
  }
  let users = new Users();
  users.set("name",name);
  users.set("email",email);
  users.set("Town", town);
  return users.save();
 }

export function deleteUser(user){
  return user.destroy();
}

function validateEmail(email) {
  let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email.trim());
  }