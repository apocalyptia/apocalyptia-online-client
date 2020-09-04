const successResponse = require('./utils/successResponse')
const failureResponse = require('./utils/failureResponse')
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
	const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
	return client.query(q.Create(q.Collection(`characters`), { data: JSON.parse(event.body) }))
				.then(res => successResponse(res))
				.catch(err => failureResponse(err))
}