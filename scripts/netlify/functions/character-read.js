const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
	const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

	let dbCall = client.query(
		q.Get(
			q.Ref(
				q.Collection(`Characters`),
				{ data: JSON.parse(event.body) }
			)
		)
	)
	console.log(dbCall)
	return dbCall
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