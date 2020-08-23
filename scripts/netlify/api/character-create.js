const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const getId = require('./utils/getId')
const faunadb = require('faunadb')

const q = faunadb.query

const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const characterCreateQuery = (user, character) => {
	console.log('CHARACTER CREATE QUERY!')
	console.log(user)
	console.log(character)
	return q.Create(
		q.Ref(`characters`),
		{
			data: {
				user: user,
				character: character
			}
		}
	)
}

exports.handler = async (event) => {
	console.log('CREATE EVENT!')
	const user = event.body.user
	const character = event.body.character
	return client.query(
		characterCreateQuery(user, character)
	)
		.then(successResponse(res))
		.catch(failureResponse(res))
}