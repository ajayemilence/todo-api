var express = require('express');
var bodyParser = require('body-parser');
_ = require('underscore');
var app = express();
var PORT = 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req , res){
	res.send('todo api Root');
});

//Get/todos
app.get('/todos', function(req, res){
	res.json(todos);
});
//get /todos/:id
app.get('/todos/:id', function(req,res){
	var todoID = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id: todoID});
	// var matchedTodo;

	// todos.forEach(function(todo){
	// 	if (todoID === todo.id){
	// 		matchedTodo = todo;
	// 	}
	// });
	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}


	//iterate of todos arrays. Find the match. 

	 // res.send('asking for todos with id of '+ res.params.id)

	 });

	app.post('/todos',function (req ,res){
		var body = _.pick(req.body, 'description','completed');

		if(!_.isBoolean(body.completed)|| !_.isString(body.description) || body.description.trim().length ===0){
			return res.status(400).send();
		}

		body.description =body.description.trim();

		body.id = todoNextId++;
		todos.push(body);

		res.json(body);
	});
// delete/todos/id
app.delete('/todos/:id', function (req, res){
	var todoID = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoID});

	if(!matchedTodo){
		res.status(404).json({"error": "no todo found with the id"});
	}
	else{
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});
//put /todos/:id
app.put('/todos/:id', function (req, res){
	var todoID = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id: todoID});
	var body = _.pick(req.body, 'description','completed');
	var validAttributes ={};

	if (!matchedTodo){
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(bodyParser.completed)){
		validAttributes.completed =body.completed;
	}else if (body.hasOwnProperty('completed')){
		return res.status(400).send();
	}else{
		//never provided attribute , no problem here
	}
	if (body.hasOwnProperty('description')&& _.isString(body.description) && body.description.trim().length >0){
		validAttributes.description = body.description;
	}else if(body.hasOwnProperty('description')){
		return res.stattus(400).send();
	}

	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);

});

app.listen(PORT ,function (){
	console.log('Express listening on port ' + PORT +'!');
});