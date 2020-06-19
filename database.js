
var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Channa@2000',
	database : 'myapp'
});
connection.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = connection;