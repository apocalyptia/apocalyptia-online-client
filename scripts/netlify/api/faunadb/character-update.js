const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const getId = require('./utils/getId')
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const characterUpdateQuery = (event, id) => {
	return q.Update(
		q.Ref(`character/${id}`),
		{
			data: JSON.parse(event.body)
		}
	)
}

exports.handler = async (event) => {
	return client.query(characterUpdateQuery(event, getId(event.path)))
		.then(successResponse(res))
		.catch(failureResponse(res))
}