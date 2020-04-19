const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

exports.handler = async (event) => {
	const data = JSON.parse(event.body)
	const characterItem = { data: data }
	return client.query(
		q.Create(
			q.Collection('characters'),
			characterItem
		)
	)
	.then(res => {
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