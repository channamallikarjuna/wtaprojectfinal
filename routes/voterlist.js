var express = require('express');
var router = express.Router();
var path = require('path');
//var db = require(path.join(__dirname + '../database.js'));
var db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM voterlogin';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    res.render('user-list', { title: 'User List', data: data});
  });
});
module.exports = router;