var express = require('express');
var app = express();
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var commentController = require('./commentController')

// Configure env variables
dotenv.config();

mongoose.connect(process.env.DBURL, {useNewUrlParser : true})
var db = mongoose.connection;
db.on('error' , console.error.bind(console, 'connection error'));
db.once('open', function() {
	console.log('Connected to database successfully')
})



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
	var contactName = req.body.contactName
	var contactEmail = req.body.contactEmail
	var contactSubject = req.body.contactSubject
	var contactMessage = req.body.contactMessage

	const accountSid = process.env.TWILIOSID;
	const authToken = process.env.TWILIOAUTHTOKEN;
	const client = require('twilio')(accountSid, authToken);

	var messageData = contactName + ' with email : ' + contactEmail + ' has contacted you with subject : ' + contactSubject + ' with message : ' + contactMessage
	client.messages
	.create({
		body:  messageData,
		from: '+12028318304',
		to: '+6581184502'
	})
	.then(message => console.log(message.sid));

	res.status(200).send('OK')
})

app.get('/getAllComments', commentController.getAllComments)
app.post('/addComment' , commentController.addComment)
app.put('/addReply', commentController.addCommentReply)
