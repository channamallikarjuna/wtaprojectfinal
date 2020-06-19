var http = require('http');

var mysql = require('mysql');
var path = require('path');
var express = require('express');

//ar routes = require(path.join(__dirname ,'/routes'));


//Including controller/dao for testtable
var testtable = require(path.join(__dirname ,'/routes/voterlist')); 
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.logger('dev'));
/*app.use(express.urlencoded());
app.use(express.methodOverride());*/
app.use(express.static(path.join(__dirname, 'public')));
// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/
//var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
//app.set('view engine', 'ejs'); 
//var path = require('path');
var userRouter = require(path.join(__dirname + '/routes/voterlist.js'));


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Channa@2000',
	database : 'myapp'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/user',userRouter);

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/home.html'));
});
app.get('/logout', function(request, response) {
	request.session.username=null;
	request.session.loggedin = false;
	response.sendFile(path.join(__dirname + '/public/home.html'));
});
app.get('/gohome', function(request, response) {
	//response.sendFile(path.join(__dirname + '/public/home.html'));
});
app.get('/golink', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/links.html'));
});
app.get('/gocontact', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/contact.html'));
});
app.get('/goabout', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/about.html'));
});
app.get('/adminlogin', function(request, response) {
	response.sendFile(path.join(__dirname + '/admin_login.html'));
});
app.get('/candidatelogin', function(request, response) {
	response.sendFile(path.join(__dirname + '/candidate_login.html'));
});
app.get('/voterlogin', function(request, response) {
	response.sendFile(path.join(__dirname + '/voter_login.html'));
});
app.get('/adminsignin', function(request, response) {
	response.sendFile(path.join(__dirname + '/adminsignin.html'));
});
app.get('/candidatesignin', function(request, response) {
	var d = new Date();
	var sql='SELECT * FROM election where status = "NOTCOMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	console.log(" see now the next line contains data");
    	if(data2.length>0)
    	{
    		var startdate=data2[0].startdate;
    		var enddate=data2[0].enddate;
    		if(d<startdate.getTime())
 			response.sendFile(path.join(__dirname + '/candidatesignup.html'));
 		else
 			response.send("election already started u cant register now");
}
else
response.send("THere are no elections now");
});
	
});
app.get('/votersignin', function(request, response) {
	response.sendFile(path.join(__dirname + '/votersignup.html'));
});
app.get('/scheduleelection', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/scheduleelection.html'));
});
app.get('/selectlogin', function(request, response) {
	
	response.sendFile(path.join(__dirname + '/public/selectlogin.html'));
});
app.get('/selectsignin', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/selectsignin.html'));
});
app.get('/voterforgotpassword', function(request, response) {
	response.sendFile(path.join(__dirname + '/voterforgotpassword.html'));
});
app.get('/candidateforgotpassword', function(request, response) {
	response.sendFile(path.join(__dirname + '/candidateforgotpassword.html'));
});
app.get('/adminforgotpassword', function(request, response) {
	response.sendFile(path.join(__dirname + '/adminforgotpassword.html'));
});
/*app.get('/gohome', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));
	app.set('view engine', 'ejs');
	response.render('user-list');
});*/
//app.get('/gohome', testtable.list);
//app.use(app.router);

app.get('/gotovoter', function(request, response) {
	
var sql='SELECT * FROM voterdetails where voterid = ?';
    connection.query(sql,[request.session.username], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('gotovoter',{ title: 'VOTER', data: data});
});



});


app.get('/gotocandidate', function(request, response) {
	
var sql='SELECT * FROM candidatedetails where candidateid = ?';
    connection.query(sql,[request.session.username], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('gotocandidate',{ title: 'CANDIDATE', data: data});
});



});
app.get('/gotoadmin', function(request, response) {
	
var sql='SELECT * FROM admindetails where adminid = ?';
    connection.query(sql,[request.session.username], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    console.log(data);
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('gotoadmin',{ title: 'ADMIN', data: data});
});



});


app.get('/seecandidates', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));
	if(request.session.username!=12345)
	{

	var constituency='SELECT constituency FROM admindetails where adminid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('seecandidates',{ title: 'CANDI', data: data});
});

});
}
else
{
	var sql='SELECT * FROM candidatedetails ';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('seecandidates',{ title: 'CANDI', data: data});
});
}
});


app.get('/seeadminvoters', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));
	if(request.session.username!=12345)
	{

	var constituency='SELECT constituency FROM admindetails where adminid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM voterdetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('seeadminvoters',{ title: 'admivoters', data: data});
});

});
}
else
{
	var sql='SELECT * FROM voterdetails';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('seeadminvoters',{ title: 'admivoters', data: data});
});
}
});



app.get('/seecandidatevoters', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));

	var constituency='SELECT constituency FROM candidatedetails where candidateid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM voterdetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('seecandidatevoters',{ title: 'candivoters', data: data});
});

});});

app.get('/seevotercandidates', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));

	var constituency='SELECT constituency FROM voterdetails where voterid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('seevotercandidates',{ title: 'voterscandi', data: data});
});

});});


app.get('/result', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));
	var d = new Date();
	var sql='SELECT * FROM election where status = "NOTCOMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	console.log(" see now the next line contains data");
    	if(data2.length==0)
    	{
    		

	var constituency='SELECT constituency FROM voterdetails where voterid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('result',{ title: 'result', data: data});
});

});
}
else
{
	var startdate=data2[0].startdate;
    		var enddate=data2[0].enddate;
    		if(startdate.getTime()<d && d<enddate.getTime())
    		{
    			
			response.send("ELECTION IS GOING ON WAIT FOR ELECTION TO COMPLETE");
    		}
    		else if(d>enddate.getTime())
    		{
    			var sql='update election set status = "COMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	response.redirect('/result');
    });
    		}
    		else
    		{
    				var constituency='SELECT constituency FROM voterdetails where voterid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('result',{ title: 'result', data: data});
});

});
    		}


}
});

    });
app.get('/winner', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));

	var constituency='SELECT constituency FROM voterdetails where voterid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT max(votes)  as mallu FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].mallu);
    console.log("\nthis is data");

    var sql='SELECT * FROM candidatedetails where votes = ? and constituency=?' ;
    connection.query(sql,[data[0].mallu,da[0].constituency], function (err, winner, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(da[0].constituency);
    console.log("\nthis is data");
    console.log(winner);

    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('winner',{ title: '', data: winner});
});
});

});});




app.post('/voterdetails', function(request, response) {
	var firstname = request.body.Firstname;
	var middlename = request.body.Middlename;
	var lastname   = request.body.Lastname;
	var mobilenumber = request.body.mobile;
	var DOB=request.body.dob;
	var email=request.body.gmail;
	var phonenumber=request.body.phone;
	var alternatephone=request.body.alternatephone;
	var state=request.body.state;
	var constituency=request.body.constituency;
	var voterid=request.body.voterid;
	var password=request.body.password;
	console.log(request.body);
	if (voterid && password) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";
		
			connection.query('SELECT * FROM voterdetails WHERE voterid = ? ', [voterid], function(error, results, fields) {
			if (results.length > 0)
			{
				response.send("this id is already used ise some new");
			}
			
			else
			{
			connection.query('INSERT INTO voterdetails(voterid,password,firstname,middlename,lastname,mobilenumber,DOB,email,phonenumber,alternatephone,state,constituency) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',[voterid,password,firstname,middlename,lastname,mobilenumber,DOB,email,phonenumber,alternatephone,state,constituency],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{throw err; }
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/voterlogin');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});

		}
	});

		
	}
else {

		response.send('Please enter Username and Password!' + firstname + DOB + "HII");
		response.end();
		}
});

app.post('/voterresetpassword', function(request, response) {
	
	
	var voterid=request.body.voterid;
	var password=request.body.password;
	if (password && voterid) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";



		


			

			connection.query('update voterdetails set password= ? where voterid= ?',[password,voterid],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{
						response.redirect('/votersignin');
						

					}
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/voterlogin');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});
		
		

	}
else {
		response.send('Please enter Username and Password!');
		response.end();
		}
});

app.post('/candidateresetpassword', function(request, response) {
	
	
	var candidateid=request.body.candidateid;
	var password=request.body.password;
	if (password && candidateid) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";



		


			

			connection.query('update candidatedetails set password= ? where candidateid= ?',[password,candidateidid],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{ response.redirect('/candidatesignin');}
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/candidatelogin');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});
	
		

	}
else {
		response.send('Please enter Username and Password!');
		response.end();
		}
});



app.post('/adminresetpassword', function(request, response) {
	
	
	var adminid=request.body.adminid;
	var password=request.body.password;
	if (password && adminid) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";



		

			connection.query('update admindetails set password= ? where adminid= ?',[password,adminid],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{response.redirect('/adminsignin');}
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/adminlogin');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});
		

	}
else {
		response.send('Please enter Username and Password!');
		response.end();
		}
});





app.post('/admindetails', function(request, response) {
	var firstname = request.body.Firstname;
	var middlename = request.body.Middlename;
	var lastname   = request.body.Lastname;
	var mobilenumber = request.body.mobile;
	var DOB=request.body.dob;
	var email=request.body.gmail;
	var phonenumber=request.body.phone;
	var alternatephone=request.body.alternatephone;
	var state=request.body.state;
	var constituency=request.body.constituency;
	var adminid=request.body.adminid;
	var password=request.body.password;
	console.log(request.body);
	if (DOB && adminid) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";



		connection.query('SELECT * FROM admindetails WHERE adminid = ? ', [adminid], function(error, results, fields) {
			
					connection.query('SELECT * FROM admindetails WHERE constituency = ? ', [constituency], function(error, resu, fields) {
			if (resu.length > 0 || results.length>0)
			{
				if(results.length>0)
					response.send("this id is already used");
					else
				response.send("sorry already a admin is there for this constituency");
				

			}
			else
			{

			

			connection.query('INSERT INTO admindetails(adminid,password,firstname,middlename,lastname,mobilenumber,DOB,email,phonenumber,alternatephone,state,constituency) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',[adminid,password,firstname,middlename,lastname,mobilenumber,DOB,email,phonenumber,alternatephone,state,constituency],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{throw err; }
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/adminlogin');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});
		}
	});
		
	});
		
		

	}
else {
		response.send('Please enter Username and Password!');
		response.end();
		}
});





app.post('/candidatedetails', function(request, response) {
	var firstname = request.body.candidateFirstname;
	var middlename = request.body.candidateMiddlename;
	var lastname   = request.body.candidateLastname;
	var mobilenumber = request.body.candidatemobile;
	var DOB=request.body.candidatedob;
	var email=request.body.candidategmail;
	var phonenumber=request.body.phone;
	var alternatephone=request.body.alternatephone;
	var state=request.body.state;
	var constituency=request.body.constituency;
	var profession =request.body.profession;
	var party=request.body.party;
	var movableassets=request.body.movableassets;
	var immovableassets=request.body.immovableassets;
	var govtdues=request.body.govtdues;
	var loan=request.body.loans;
	var criminalcases=request.body.criminalcases;
	var candidateid=request.body.candidateid;
	var password=request.body.password;

	if (candidateid && password) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";
		connection.query('SELECT * FROM candidatedetails WHERE candidateid = ? ', [candidateid], function(error, results, fields) {
			
				connection.query('SELECT * FROM candidatedetails WHERE party = ? and constituency=?', [party,constituency], function(error, resu, fields) {
			if (resu.length > 0 || results.length>0)
			{
				if(results.length>0)
					response.send("this id is already used");
					else
				response.send("sorry already a candidate is registered from this party");
				

			}
			
			else
			{

		
			connection.query('INSERT INTO candidatedetails(candidateid ,password,firstname,middlename,lastname,mobilenumber,DOB,email,phonenumber,alternatephone,state,constituency,profession,party,movableassets,immovableassets,govtdues,loans,criminalcases) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[candidateid,password,firstname,middlename,lastname,mobilenumber,DOB,email,phonenumber,alternatephone,state,constituency,profession,party,movableassets,immovableassets,govtdues,loan,criminalcases],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{throw err; }
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/candidatelogin');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});
		}
	
});
			
	});
		
	}
else {
		response.send('Please enter Username and Password!' + firstname + DOB + "hii");
		response.end();
		}
});










app.post('/voterinputs', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";
		connection.connect(function(err)
		{
			if(err) throw err;
			console.log("connected");
			connection.query('INSERT INTO voterlogin VALUES(?,?)',[username,password],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{throw err; }
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/t');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});
		});
	}
else {
		response.send('Please enter Username and Password!');
		response.end();
		}
});


app.post('/candidateinputs', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";
		connection.connect(function(err)
		{
			if(err) throw err;
			console.log("connected");
			connection.query('INSERT INTO candidatelogin VALUES(?,?)',[username,password],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{throw err; }
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/t');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});
		});
	}
else {
		response.send('Please enter Username and Password!');
		response.end();
		}
});
app.post('/admininputs', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";
		connection.connect(function(err)
		{
			if(err) throw err;
			console.log("connected");
			connection.query('INSERT INTO adminlogin VALUES(?,?)',[username,password],function(err,result,fields)
			{
				//response.sendFile(path.join(__dirname + '/login.html'));
				
				if (err) 
					{throw err; }
				else
					{
				console.log("1 record inserted"); 
			//response.writeHead(301, { "Location": "http://" + request.headers['host'] + '/login.html' });
				 //response.send('Welcome back, ' + username + '!' + password);
					//response.sendFile(path.join(__dirname + '/login.html'));
				 //response.redirect('/t');
				 response.redirect('/t');
				}
			//} else {
				//response.send('Incorrect Username and/or Password!');
			//}			
				response.end();
			});
		});
	}
else {
		response.send('Please enter Username and Password!');
		response.end();
		}
});

app.get('/govote', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));
var d = new Date();
	var sql='SELECT * FROM election where status = "NOTCOMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	console.log(" see now the next line contains data");
    	if(data2.length>0)
    	{
    		var startdate=data2[0].startdate;
    		var enddate=data2[0].enddate;

    		if (startdate.getTime()< d ) 
    		{

    			if(d<enddate.getTime())
    		{
    			var sql='SELECT * FROM voterdetails where voterid = ?';
    	connection.query(sql,[request.session.username], function (err, data1, fields) {
    	if (err) throw err;
    	if(data1[0].voted!="Yes")
    	{

	var constituency='SELECT constituency FROM voterdetails where voterid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('voting',{ title: 'VOTING', data: data});
});

});
}
else
{
	response.send("U ALREADY VOTED THANK YOU ");
}
});
}
else
{
	var sql='update election set status = "COMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    });
	response.send("ELECTION TIME IS OVER  it got completed on " + endate);
}
}
else
{
	
	response.send("ELECTION STARTS @ " + startdate);
}
}
else
{
	response.send("NO ELECTION FOR YOU STAY TUNED ");
}
});


});

//app.get('/', function(request, response) {
//	response.sendFile(path.join(__dirname + '/login.html'));
//});
app.get('/t', function(request, response) {
	//response.send('Welcome back, ' + username + '!' + password);
	response.sendFile(path.join(__dirname + '/login.html'));
	response.end();
});


app.get('/votesforparty', function(request, response) {
	//response.send('Welcome back, ' + username + '!' + password);
	var sql='SELECT party,sum(votes) as votes FROM  candidatedetails group by party';
    	connection.query(sql, function (err, data, fields) {
    	if (err) throw err;
    	
    	console.log(data);
    	app.set('view engine', 'ejs');
	response.render('votesforparty',{ title: 'Votesforparty', data: data});
});

});
app.get('/constituencyvoters', function(request, response) {
	//response.send('Welcome back, ' + username + '!' + password);
	var sql='SELECT constituency,sum(votes) as votes FROM  candidatedetails group by constituency';
    	connection.query(sql, function (err, data, fields) {
    	if (err) throw err;
    	console.log(data);
    	app.set('view engine', 'ejs');
	response.render('constituencyvoters',{ title: 'Votesfor', data: data});
});

});




app.post('/voterauth', function(request, response) {
	var username = request.body.voterid;
	var password = request.body.password;
	if(!(request.session.loggedin))
	{
	if (username && password) {
		connection.query('SELECT * FROM voterdetails WHERE voterid = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				
				response.redirect('/gotovoter');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}
else
{
	response.redirect('/gotovoter');
}
});


app.post('/candidateauth', function(request, response) {
	var username = request.body.candidateid;
	var password = request.body.password;
	if(!(request.session.loggedin))
	{
	if (username && password) {
		connection.query('SELECT * FROM candidatedetails WHERE candidateid = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				
				response.redirect('/gotocandidate');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}
	else
{
	response.redirect('/gotocandidate');
}
});
app.post('/voted', function(request, response) {
	var username = request.body.candidateid;
	console.log( "username = " + username);


	var d = new Date();
	var sql='SELECT * FROM election where status = "NOTCOMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	console.log(" see now the next line contains data");
    	if(data2.length>0)
    	{
    		var startdate=data2[0].startdate;
    		var enddate=data2[0].enddate;

    		if (startdate.getTime()< d ) 
    		{

    			if(d<enddate.getTime())
    		{
    			var sql='SELECT * FROM voterdetails where voterid = ?';
    	connection.query(sql,[request.session.username], function (err, data1, fields) {
    	if (err) throw err;
    	if(data1[0].voted!="Yes")
    	{
	
	if (username) 
	{
		var sql='SELECT votes FROM candidatedetails where candidateid = ?';
    	connection.query(sql,[username], function (err, data, fields) {
    	if (err) throw err;
    	console.log(" see now the next line contains data");
    	
    	var sql='update  candidatedetails set votes= ? where candidateid = ?';
    	connection.query(sql,[data[0].votes+1,username], function (err, data, fields) {
    	if (err) throw err;
    	console.log("vote added");
    	});

    	});
    	var sql='update  voterdetails set voted= ? where voterid = ?';
    	connection.query(sql,["Yes",request.session.username], function (err, data, fields) {
    	if (err) throw err;
    	console.log("voter voted");
    	});
    	response.redirect('/gotovoter');

	} 
	else 
	{
		response.send('SORRY UR VOTE WAS NOT CASTED CAST ONCE AGAIN' + username);
		response.end();
	}
}
	else
{
	response.send("U ALREADY VOTED THANK YOU THIS VOTE IS NOT CONSIDERED");
}
});
}
else
{
	var sql='update election set status = "COMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    });
	response.send("ELECTION TIME IS OVER  it got completed on " + endate);
}
}
else
{
	
	response.send("ELECTION STARTS @ " + startdate);
}
}
else
{
	response.send("NO ELECTION FOR YOU STAY TUNED ");
}
});
	
});

app.post('/adminauth', function(request, response) {
	var username = request.body.adminid;
	var password = request.body.password;
if(!(request.session.loggedin))
	{
	if (username && password) {
		connection.query('SELECT * FROM admindetails WHERE adminid = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				
				response.redirect('/gotoadmin');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}
else
{
	response.redirect('/gotoadmin');
}
});
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		{


				connection.query("SELECT * FROM voterdetails", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    response.send(result);
  });
			response.send('Welcome back, ' + request.session.username + '!');
			//response.sendFile(path.join(__dirname + '/home.html'));
		}
	} else {

		response.send('Please login to view this page!');
	}
	response.end();
});
app.post('/schedulenow', function(request, response) {
	var startyear=request.body.startyear;
	var startmonth=request.body.startmonth;
	var startday=request.body.startday;
	var starthour=request.body.starthour;
	var startminute=request.body.startminute;
	var endyear=request.body.endyear;
	var endmonth=request.body.endmonth;
	var endday=request.body.endday;
	var endhour=request.body.endhour;
	var endminute=request.body.endminute;
	var startdate=new Date(startyear,startmonth-1,startday,starthour,startminute,0,0);
	var enddate=new Date(endyear,endmonth-1,endday,endhour,endminute,0,0);

	var d = new Date();
	if (startdate.getTime() < enddate.getTime()  && d<startdate.getTime()) 
	{
		//var sql="INSERT INTO voterlogin VALUES(username,password)";
		
		connection.query("insert into election(startdate,enddate,status) values(?,?,?)",[startdate,enddate,"NOTCOMPLETED"], function (err, result, fields) {
    	if (err) throw err;
    	console.log(result);
    	
  	});
		connection.query("update candidatedetails set votes= ?",[0], function (err, result, fields) {
    	if (err) throw err;
    	console.log(result);
    	
  	});
		connection.query("update voterdetails set voted= ?",["No"], function (err, result, fields) {
    	if (err) throw err;
    	console.log(result);
    	
  	});

		response.redirect('/gotoadmin');
	}
else {

		response.send('wrong timings' +  + "HII");
		response.end();
		}
});


app.get('/candidateresult', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));
	var d = new Date();
	var sql='SELECT * FROM election where status = "NOTCOMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	console.log(" see now the next line contains data");
    	if(data2.length==0)
    	{
    		

	var constituency='SELECT constituency FROM candidatedetails where candidateid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('candidateresult',{ title: 'candidateresult', data: data});
});

});
}
else
{
	var startdate=data2[0].startdate;
    		var enddate=data2[0].enddate;
    		if(startdate.getTime()<d && d<enddate.getTime())
    		{
    			
			response.send("ELECTION IS GOING ON WAIT FOR ELECTION TO COMPLETE");
    		}
    		else if(d>enddate.getTime())
    		{
    			var sql='update election set status = "COMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	response.redirect('/result');
    });
    		}
    		else
    		{
    				var constituency='SELECT constituency FROM candidatedetails where candidateid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('candidateresult',{ title: 'candidateresult', data: data});
});

});
    		}


}
});
    });

app.get('/candidatewinner', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));

	var constituency='SELECT constituency FROM candidatedetails where candidateid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT max(votes)  as mallu FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].mallu);
    console.log("\nthis is data");

    var sql='SELECT * FROM candidatedetails where votes = ?';
    connection.query(sql,[data[0].mallu], function (err, winner, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    console.log(winner);

    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('winner',{ title: '', data: winner});
});
});

});});


app.get('/adminresult', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));
	if(request.session.username!=12345)
	{
	var d = new Date();
	var sql='SELECT * FROM election where status = "NOTCOMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	console.log(" see now the next line contains data");
    	if(data2.length==0)
    	{
    		
    		console.log("all elections are competed");
	var constituency='SELECT constituency FROM admindetails where adminid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;

    
    console.log(da);
    console.log(request.session.username);
    console.log("admin constituency = " + da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('adminresult',{ title: 'adminresult', data: data});
});


});
}
else
{
	var startdate=data2[0].startdate;
    		var enddate=data2[0].enddate;
    		if(startdate.getTime()<d && d<enddate.getTime())
    		{
    			
			response.send("ELECTION IS GOING ON WAIT FOR ELECTION TO COMPLETE");
    		}
    		else if(d>enddate.getTime())
    		{
    			var sql='update election set status = "COMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	response.redirect('/result');
    });
    		}
    		else
    		{
    				var constituency='SELECT constituency FROM admindetails where adminid= ?';
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) {
    	var sql='SELECT * FROM candidatedetails ';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('adminresult',{ title: 'adminresult', data: data});
});

    }
    else
    {
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT * FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('adminresult',{ title: 'adminresult', data: data});

});
}

});
    		}


}
});
    }
    else
    {
    	var d = new Date();
	var sql='SELECT * FROM election where status = "NOTCOMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	console.log(" see now the next line contains data");
    	if(data2.length==0)
    	{
    		
    		console.log("all elections are completed");
	

    var sql='SELECT * FROM candidatedetails ';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('adminresult',{ title: 'adminresult', data: data});
});



}
else
{
	var startdate=data2[0].startdate;
    		var enddate=data2[0].enddate;
    		if(startdate.getTime()<d && d<enddate.getTime())
    		{
    			
			response.send("ELECTION IS GOING ON WAIT FOR ELECTION TO COMPLETE");
    		}
    		else if(d>enddate.getTime())
    		{
    			var sql='update election set status = "COMPLETED"';
    	connection.query(sql, function (err, data2, fields) {
    	if (err) throw err;
    	response.redirect('/result');
    });
    		}
    		
    				

    var sql='SELECT * FROM candidatedetails ';
    connection.query(sql,function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    
    console.log("\nthis is data");
    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('adminresult',{ title: 'adminresult', data: data});

});
}


    		


});

    }

    });
app.get('/adminwinner', function(request, response) {
	//response.sendFile(path.join(__dirname + '/views/user-list.ejs'));
	if(request.session.username!=12345)
	{

	var constituency='SELECT * FROM admindetails where adminid= ?';
	console.log("wecome to admin winner");
	var c="";
	connection.query(constituency,[request.session.username], function (err, da, fields) {
    if (err) throw err;
     
     console.log("data in adminresult");
    
    console.log(da);
    console.log(request.session.username);
    console.log(da[0].constituency)

    var sql='SELECT max(votes)  as mallu FROM candidatedetails where constituency = ?';
    connection.query(sql,[da[0].constituency], function (err, data, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].mallu);
    console.log("\nthis is data");

    var sql='SELECT * FROM candidatedetails where votes = ?';
    connection.query(sql,[data[0].mallu], function (err, winner, fields) {
    if (err) throw err;
    console.log(" see now the next line contains data");
    console.log(data[0].constituency);
    console.log("\nthis is data");
    console.log(winner);

    //window.alert(data);
    //res.send(data);
    //res.render('user-list', { title: 'User List', data: data});


	app.set('view engine', 'ejs');
	response.render('winner',{ title: '', data: winner});
});
});

});
}
else
{
	let array=[];
	var sql='SELECT max(votes) as mallu,constituency FROM candidatedetails group by constituency';
    connection.query(sql, function (err, d, fields) {
    if (err) throw err;
    /*console.log("constituency and its highest");
    console.log(d);*/
    
    for(let i=0;i<d.length;i++)
    {
    	

    	
    	
   $.doSthWithCallbacks( function() {
   	var sql='SELECT * FROM candidatedetails where votes= ? and constituency= ?';
    	connection.query(sql,[d[i].mallu,d[i].constituency], function (err, da, fields) {
    	if (err) throw err;

    	/*console.log(da);
    	console.log(da[0].candidateid);
    	
    	console.log([da[0].candidateid,da[0].firstname,da[0].constituency,da[0].votes]);
    	console.log(data[i]);*/
    	//console.log([da[0].candidateid,da[0].firstname,da[0].constituency,da[0].votes]);

    	//array.push([da[0].candidateid,da[0].firstname,da[0].constituency,da[0].votes]);
    	console.log(array.push(da));
    	console.log(array);
    	
		});
    
  });
}
	
	
	//console.log(Object.values(data));
	console.log("the length of data :: ");
	console.log(array.length);
	console.log(array[1]);


    app.set('view engine', 'ejs');
	response.render('adminwinner',{ title: '', data: array});
	console.log(array);


});
}
});



(function() {
  // Something declared here will only be available to the function below.
  // Code here is executed only once upon the creation of the inner function
  return function(callbackArguments) {
    // Actual callback here
  };
})(); // The last brackets execute the outer function


app.listen(3089);
