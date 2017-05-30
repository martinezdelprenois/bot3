'use strict'

const express = require('express')
const body_parser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// allows us to process data
app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())

// ROUTES
app.get('/', function(req, res){
	res.send("Hi there welcome, we da fillers in this one joint, into")
})

let  token ="EAAEa2vcB3bgBAKD5Ae0PQJ9Det03ZCUc3Bk2LZBZAyovunHO0nM4ZCZBE5HZChIvfDkJzmKs1Uk4bg1cE01Lq9ZBlFUZAjv4cmrdUKZCG9pL9jBAqHQ290NxpvKZCrBbZCzGIZBdHLkreLpF9q0FhkXJVxNwF6ZCLrBDPZBxZCZBg8l8B89e3QZDZD"

//FACEBOOK ROUTE
app.get('/webhook/', function(req,res){
	  if (req.query['hub.verify_token'] === 'jusjus') {
      res.send(req.query['hub.challenge']);
   } else {
      res.send('Error, wrong validation token');    
   }

})

app.post('webhook', function(req,res){
	let messaging_events = req.body.entry[0].messaging
	for(let i=0; i < messaging_events.length; i++){
		 let event = messaging_events[i]
		 let sender = event.sender.id
		 if(event.message && event.message.text){
		 	let text = event.message.text
		 	sendText(sender, "text echo: " + text.substring(0,100))
		 }
	}

	res.sendStatus(200)
})

function sendText(sender, text){
	let messageData = {text:text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs: {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message: messageData
		},
		 function (error, response, body){
if(error){
	console.log("sending error")
}
else if(response.body.error){
	console.log("response body error")
}
		 }
	})
}
app.listen(app.get('port'), function(){
	console.log("running: port")
})