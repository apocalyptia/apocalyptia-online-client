import { faunadb } from 'faunadb'

const q = faunadb.query

exports.handler = (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	const character = event.body

	return client.query(
		q.Delete(
			q.Ref(
				q.Collection(`Characters`), {
					data: JSON.parse(character)
				}
			)
		)
	).then(res => {
		return {
			statusCode: 200,
			body: JSON.stringify(res.ref)
		}
	}).catch(err => {
		return {
			statusCode: 400,
			body: JSON.stringify(err)
		}
	})
}