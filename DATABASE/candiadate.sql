create database CANDIDATE;

create table voters
	(
		candidateid int AUTO_INCREMENT primary key,firstname varchar(255),middlename varchar(255),lastname varchar(255),mobilenumber varchar(10),DOB DATE,email varchar(255),phonenumber varchar (10),alternatephone varchar(10),
		state varchar(255),constituency varchar(255),profession varchar(255),party varchar(255),movableassets int,immovableassets int,
		govtdues int,loans int,criminal cases varchar(255)
	);
