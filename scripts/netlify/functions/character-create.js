const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event) => {
	// const client = new faunadb.Client({
	// 	secret: process.env.FAUNADB_SERVER_SECRET
	// })
	console.log('Saving character to FaunaDB')
	console.log(event)
	// const character = JSON.parse(event.body)
	// return character
	// client.query(
	// 	q.Create(
	// 		q.Ref(
	// 			q.Collection(`characters`),
	// 			character.Mi
	// 		),
	// 		{ data: character }
	// 	)
	// )
		// .then(res => successResponse(res))
		// .catch(err => failureResponse(err))
}