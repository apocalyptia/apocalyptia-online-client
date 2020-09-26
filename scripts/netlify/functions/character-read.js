const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	const character = JSON.parse(event.body)

	return client.query(
		q.Get(
			q.Collection(`characters`),
			{ data: character._id }
		)
	)
	.then(res => {
		return {
			statusCode: 200,
			body: JSON.stringify(res)
		}
	})
	.catch(err => {
		return {
			statusCode: 400,
			body: JSON.stringify(err)
		}
	})
}