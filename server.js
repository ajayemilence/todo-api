var express = require('express');
var app = express();
var PORT = 3000;
var todos = [{
	id: 1,
	description : 'meet at emilence',
	completed: false
},{
	id: 2,
	description : 'go to market',
	completed: false
},{
	id : 3,
	description: 'persent at sept 3',
	completed: true
}];

app.get('/', function (req , res){
	res.send('todo api Root')
});

//Get/todos
app.get('/todos', function(req, res){
	res.json(todos);
});
//get /todos/:id
app.get('/todos/:id', function(req,res){
	var todoID =parseInt(req.params.id,10);
	console.log(todoID);
	var matchedTodo;

for (i=0;i<todos.length;i++)
{
	var to = todos[i].id;
	console.log(to);
	if(todoId==to)
	{
		matchedTodo = to;
	}
}
	// todos.forEach(function(todo){
	// 	console.log(todo.id);
	// 	if (todoId === todo.id){
	// 		matchedTodo=todo;
	// 		console.log(matchedTodo);
	// 	}
	// });

	if(matchedTodo){
		//res.json(matchedTodo);
		res.send('asking for todos with id of '+ res.params.matchedTodo);
	}else{
		res.status(404).send();
	}


	//iterate of todos arrays. Find the match. 

});

app.listen(PORT ,function (){
	console.log('Express listening on port ' + PORT +'!');
});