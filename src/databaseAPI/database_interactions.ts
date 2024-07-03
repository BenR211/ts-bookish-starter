import { resolve } from "path";
import { bookElem, returnedBooks } from "../bookInterfaces/books";

export const server_conf = {
    "server": "LLAMA",
    "authentication": {
      "type": "default",
      "options": {
        "userName": "Fred",
        "password": "EagleS814444!"
      }
    },
    "options": {
      "port": 1433,
      "database": "bookish",
      "trustServerCertificate": true
    }
  }


export function runQuery(myQuery : string) : Promise<returnedBooks> {
    console.log("yes i am runninh");
    const Request = require('tedious').Request;
    const Connection = require('tedious').Connection;
    const connection = new Connection(server_conf);
    connection.connect();
    return new Promise ((resolve, reject ) => {
        connection.on('connect', (err) => {
            if (err) {
              console.log('Connection Failed');
              reject(err);
            }
            resolve (executeStatement());
          });
        
    })
    
    function executeStatement() : Promise<returnedBooks> {
      const request = new Request(myQuery, (err, rowCount) => {
        if (err) {
          throw err;
        }
        console.log('DONE!');
        connection.close();
      });

      const allBooks : returnedBooks = {books : []}
      // Emits a 'DoneInProc' event when completed.
      connection.execSql(request);
      
      
      return new Promise ((resolve, reject ) => {
        request.on('row', (columns) => {
            const myBook : bookElem = {bookName : "", authName : "", ISNB : ""}
            columns.forEach((column) => {
              if (column.value === null) {
                console.log('NULL');
              } 
              
              else {
                
                if (column.metadata.colName === 'bookName'){
                    myBook.bookName = column.value
                }
                if (column.metadata.colName === 'authorName'){
                    myBook.authName = column.value
                }
                if (column.metadata.colName === 'ISBN'){
                    myBook.ISNB = column.value
                }
              }
            });
            //console.log(myBook)
            allBooks.books.push(myBook)
            //myBook = {bookName : "", authName : "", ISNB : ""}
          });
          // In SQL Server 2000 you may need: connection.execSqlBatch(request);
          
          
          
          console.log(allBooks.books)
          request.on('doneInProc', () => {
            console.log('All rows processed');
            console.log(allBooks.books);
            resolve(allBooks)
          });
          
          request.on('error', (err) => {
            reject(err);
          });
        
      })
    }    
}