create database admin;

create table admindetails
	(firstname varchar(255), middlename varchar(255), lastname varchar(255),
		mobilenumber varchar(10),
		DOB DATE,
		email varchar(255),
		phonenumber varchar (10),
		alternatephone varchar(10),
		adminid int primary key
	);
