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
	res.send("Hi there welcome, we da fillers in this one joint, into the disjoint")
})

//FACEBOOK ROUTE
app.get('/webhook', function(req,res){
	if(req.query ['hub.verify_token']  === "jagu_foods"){
		res.send(req.query['hub.challenge'])
	}

	res.send("wrong token")
})

app.listen(app.get('port'), function(){
	console.log("running: port")
})