//passport.jsconst 

import {sequelize} from './databaseAPI/sqlist_interactions'
import { defineUser } from './databaseAPI/sqelize_helper';
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, 
async function (email, password, cb) {        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT       
    await sequelize.authenticate();
    const userDB : any=  defineUser();
    return userDB.findOne({where : {username : 'uName', password : 'passw'} ,attributes: ['username'],})
        .then(user => {
           if (!user) {
                console.log("login rejected");               
                return cb(null, false, {message: 'Incorrect username or password.'});
           } 
           console.log("login accepted")              
           return cb(null, user, {message: 'Logged In Successfully'});
      })
      .catch(err => cb(err));
}
));