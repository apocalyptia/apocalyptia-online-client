import { faunadb } from 'faunadb'

const q = faunadb.query

exports.handler = (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	const userId = JSON.parse(event.body)

	return client.query(
		q.Get(
			q.Match(
				q.Index(`userID`),
				{ data: userId }
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