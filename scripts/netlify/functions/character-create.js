const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event) => {
	console.log(`SAVING CHARACTER = ${JSON.parse(event.body)}`)

	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	return client.query(
		q.Create(
			q.Collection(`Characters`),
			{ data: JSON.parse(event.body) }
		)
	)
		.then(res => {
			console.log(`SUCCESS = ${res}`)
			return {
				statusCode: 200,
				body: JSON.stringify(res)
			}
		})
		.catch(err => {
			console.log(`FAILURE = ${err}`)
			return {
				statusCode: 400,
				body: JSON.stringify(err)
			}
		})
}