var express = require('express');
var app = express();
var path = require("path");

function getMonth(month){
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
return monthNames[month];
};

//Routes

//Home
app.get('/', function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
	//console.log(path.join(__dirname+'/index.html'));
});

app.get('/:inputDate?', function(req,res){
	var inputDate = req.params.inputDate;
	inputDate = /^\d+$/.test(inputDate) ? parseInt(inputDate)*1000 : inputDate;
	var date = new Date(inputDate);
	var monthName = date.getMonth();
	var dayNumber = date.getDay();
	var yearNumber = date.getFullYear();
	var format = {
		unix: null,
		natural: null
	};
	if(!isNaN(date)){
		format.unix = Math.floor(date.getTime()/1000);
		format.natural = getMonth(monthName) +' '+ dayNumber +', '+ yearNumber;}
	
	res.json(format);	
	
})

var port = Number(process.env.Port || 3000);
app.listen(port, function(){
	console.log('app running');
});
