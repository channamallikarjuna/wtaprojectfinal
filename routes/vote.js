var express = require('express');
var router = express.Router();
var path = require('path');
//var db = require(path.join(__dirname + '../database.js'));
var db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/govote', function(req, res, next) {
    var constituency=req.session.constituency;
    var sql='SELECT firstname ,middlename,lastname,party FROM  candidatedetails where constituency= ' + constituency;
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    res.render('voting', { title: 'vote List', data: data});
  });
});
module.exports = router;




<div class="table-data" style="margin-left:10%;padding:0.5px 8px;height:1000px;background-image:url(download.jpeg); background-repeat: no-repeat; background-attachment: fixed; background-size: cover;">
      
    <table border="1" align="center" id="myTable">
        <tr>
            <th>CANDIDATE ID</th>
            <th>CANDIDATE NAME</th>
            <th>PARTY</th>
            <th>VOTE</th>

        </tr>
        <% for(var i=0; i < data.length; i++) { %>
    <tr>
      <td><%= data[i].candidateid %></td>
     <td><%= data[i].firstname + data[i].middlename + data[i].lastname %></td>
     <td><%= data[i].party %></td>
     <td ><button onclick="mallu()"  class="but"><img src="https://media2.giphy.com/media/KyH6bWpauFsNMr0Vhi/giphy.gif?cid=790b7611a3c703517e62da9648f2f0b0744852b0aa232964&rid=giphy.gif" height="50" width="50"></button></td>
    </tr>
    <% } %>
        
    </table>
    
    </div>