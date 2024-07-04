    import { DataTypes } from 'sequelize'
import {sequelize} from './sqlist_interactions'



export function defineBook () : any {
    
    const myBook : any  = sequelize.define('books', {
        ISBN :  {
            type : DataTypes.STRING,
            primaryKey: true
        },
        authorName : {
            type : DataTypes.STRING
        },
        bookName : {
            type : DataTypes.STRING
        },
        numberOfCopies : {
            type : DataTypes.INTEGER
        }
        
        
    } )



    
    return myBook
}


export function defineUser() : any {
    const myUser : any = sequelize.define('users', {
        userID : {
            type : DataTypes.STRING,
            primaryKey : true
        },    
        firstName : {
            type : DataTypes.STRING
        },
        lastName : {
            type : DataTypes.STRING
        },
        username : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        }

    })
}