const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const db = require('./db')
const collection = 'characters'

app.use(bodyParser.json())

db.connect((err) => {
	if (err) {
		console.log('ya fucked up kid!')
		process.exit(1)
	}
	else {
		app.listen(3000, () => {
			console.log('ya connected son!')
		})
	}
})