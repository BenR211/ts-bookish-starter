    import { DataTypes } from 'sequelize'
import {sequelize} from './sqlist_interactions'



export function defineBook () : any {
    return sequelize.define('books', {
        ISBN :  {
            type : DataTypes.STRING
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
    })
}

