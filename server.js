var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', function (req , res){
	res.send('todo api Root')
});

app.listen(PORT ,function (){
	console.log('Express listening on port ' + PORT +'!');
});