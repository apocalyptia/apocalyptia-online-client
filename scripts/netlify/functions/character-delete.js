const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	return client.query(
		q.Delete(
			q.Ref(
				q.Collection(`Characters`),
				{ data:	JSON.parse(event.body) }
			)
		)
	).then(res => {
		return {
			statusCode: 200,
			body: JSON.stringify(res)
		}
	}).catch(err => {
		return {
			statusCode: 400,
			body: JSON.stringify(err)
		}
	})
}