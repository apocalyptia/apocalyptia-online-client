const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})
	console.log('Saving character to FaunaDB')
	console.log(event.body)
	const character = JSON.parse(event.body)
	return client.query(
		q.Create(
			q.Ref(
				q.Collection(`characters`),
				character.Mi
			),
			{ data: character }
		)
	)
		.then(res => successResponse(res))
		.catch(err => failureResponse(err))
}