const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	return client.query(
		q.Get(
			q.Match(
				q.Index(`userID`),
				JSON.parse(event.body)
			)
		)
	)
	.then(res => {
		return {
			statusCode: 200,
			body: JSON.stringify(res.ref)
		}
	})
	.catch(err => {
		return {
			statusCode: 400,
			body: JSON.stringify(err)
		}
	})
}