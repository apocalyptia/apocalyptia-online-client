const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const characterReadQuery = (event) => {
	return q.Get(
		q.Ref(`characters/ReadCharacter`),
		{ data: { user: event.body.user, character: event.body.character } }
	)
}

exports.handler = async (event) => {
	return client.query(characterReadQuery(event))
		.then(res => successResponse(res))
		.catch(err => failureResponse(err))
}