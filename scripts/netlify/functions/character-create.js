const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event) => {
	console.log('SAVING CHARACTER')

	const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

	const character = JSON.parse(event.body)

	return client.query(
		q.Create(
			q.Ref(
				q.Collection(`Characters`)
			),
			{ data: character }
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