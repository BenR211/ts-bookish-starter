import { DataTypes, Model } from "sequelize";

const Sequelize = require('sequelize');

type CallbackFunction = (error: Error | null, result?: string) => void;
interface returnedBook {
    ISBN : String
    authorName : String
    bookName : String
    numberOfCopies : number
}

  export async function establish_connection(callback : CallbackFunction) {

    const sequelize = new Sequelize('bookish', 'Fred', 'EagleS814444!', {
        host: 'LLAMA',
        dialect: 'mssql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
      });


    try{
        await sequelize.authenticate();
        const Book = sequelize.define('books', {
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



        console.log("successfull database connection");
        const bookData = await Book.findAll({attributes: ['authorName', 'bookName', 'numberOfCopies'],})
        bookData.every(book => book instanceof Book)
        callback(null, bookData)
    }
    catch (error) {
        callback(new Error ("task has failed"));
    }
      
  }
  