import { DataTypes, Model } from "sequelize";
const Sequelize = require('sequelize');
import { defineBook } from "./sqelize_helper";
import { timeStamp } from "console";
type CallbackFunction = (error: Error | null, result?: string) => void;
interface returnedBook {
    ISBN : String
    authorName : String
    bookName : String
    numberOfCopies : number
}


export const sequelize = new Sequelize('bookish', 'Fred', 'EagleS814444!', {
    host: 'LLAMA',
    dialect: 'mssql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    define: {
        timestamps: false,
      },

  });


  export async function returnLibraryInFull(callback : CallbackFunction) {
    try{
        await sequelize.authenticate();

        const Book = defineBook()


        console.log("successfull database connection");
        const bookData = await Book.findAll({attributes: ['authorName', 'bookName', 'numberOfCopies'],})
        bookData.every(book => book instanceof Book)
        callback(null, bookData)
    }
    catch (error) {
        callback(new Error ("task has failed"));
    }
      
  }

  export async function returnBooksFromAuthor(querySpecifics : any, callback : CallbackFunction){
    try{
        await sequelize.authenticate();

        const Book = defineBook()

        console.log("successfull database connection");
        const bookData = await Book.findAll(querySpecifics)
        bookData.every(book => book instanceof Book)
        callback(null, bookData)
    }
    catch (error) {
        callback(new Error ("task has failed"));
    }
  }

  export async function uploadToDataBase(querySpecifics : any, callback : CallbackFunction){
    try {
        await sequelize.authenticate();
        const Book = defineBook()

        console.log("database auth is successful???")
        const bookUpload = Book.create(querySpecifics)
        
        callback(null, "successful upload")

    }
    catch (error){
        callback (new Error("task has failed"))
    }
  }
  