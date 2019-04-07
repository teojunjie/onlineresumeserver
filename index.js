var express = require('express');
var app = express();
var dotenv = require('dotenv');
var bodyParser = require('body-parser');

// Configure env variables
dotenv.config();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.env.PORT);
var server = app.listen(app.get('port'), function() {
	console.log('Online Resume Teo Jun Jie Server listening on port ' + server.address().port);
})

app.get('/', function (req, res, next) {
	res.status(200).send('Hello world')
})
app.post('/submitContactDetails' , function (req, res , next) {
	console.log(req.body)
	res.status(200).json(req.body)
})
