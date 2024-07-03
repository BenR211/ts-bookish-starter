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


export function runQuery(myQuery : string){
    console.log("yes i am runninh");
    const Request = require('tedious').Request;
    const Connection = require('tedious').Connection;
    const connection = new Connection(server_conf);
    connection.on('connect', (err) => {
      if (err) {
        console.log('Connection Failed');
        throw err;
      }
      executeStatement();
    });
    connection.connect();
    function executeStatement() {
      const request = new Request(myQuery, (err, rowCount) => {
        if (err) {
          throw err;
        }
        console.log('DONE!');
        connection.close();
      });
      // Emits a 'DoneInProc' event when completed.
      request.on('row', (columns) => {
        columns.forEach((column) => {
          if (column.value === null) {
            console.log('NULL');
          } else {
            console.log(column.value);
          }
        });
      });
      // In SQL Server 2000 you may need: connection.execSqlBatch(request);
      connection.execSql(request);
    }    
}