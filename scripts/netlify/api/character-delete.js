const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const getId = require('./utils/getId')
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const characterDeleteQuery = (event, id) => {
	return q.Delete(
		q.Ref(`character/${id}`),
		{
			data: JSON.parse(event.body)
		}
	)
}

exports.handler = async (event) => {
	return client.query(characterDeleteQuery(event, getId(event.path)))
		.then(successResponse(res))
		.catch(failureResponse(res))
}