const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})
	const character = JSON.parse(event.body)
	return client.query(
		q.Get(
			q.Ref(
				q.Collection(`characters`),
				character.Mi
			)
		)
	)
		.then(res => successResponse(res))
		.catch(err => failureResponse(err))
}