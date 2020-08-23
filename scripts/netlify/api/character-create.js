const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const faunadb = require('faunadb')


const q = faunadb.query

const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event) => {
	console.log('CREATE EVENT HANDLER!')
	const data = JSON.parse(event.body)
	return client.query(
		q.Create(
			q.Ref(`characters/createCharacter`),
			{ data: data }
		)
	)
		.then(successResponse(res))
		.catch(failureResponse(res))
}