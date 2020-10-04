const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	const userID = event.body

	return client.query(
			q.Get(
				q.Match(
					q.Index(`userID`),
					userID
				)
			)
		).then(res => {
			return client.query(
					res.data.map(ref => q.Get(ref))
				)
				.then(ret => {
					return {
						statusCode: 200,
						body: JSON.stringify(ret.ref)
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