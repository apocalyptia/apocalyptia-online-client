const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
	const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

	return client.query(
		q.Paginate(
			q.Match(
				q.Collection(`Characters`),
				{ data: JSON.parse(event.body) }
			)
		)
	)
	.then(res => {
		return client.query(res.data.map(ref => q.Get(ref)))
			.then(ret => {
				return {
					statusCode: 200,
					body: JSON.stringify(ret)
				}
			})
	})
	.catch(err => {
		return {
			statusCode: 400,
			body: JSON.stringify(err)
		}
	})
}