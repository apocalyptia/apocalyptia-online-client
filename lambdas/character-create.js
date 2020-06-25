const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

exports.handler = async (event) => {
	console.log('Creating a new character.')
	return client.query(
		q.Create(
			q.Collection('characters'),
			{ data: JSON.parse(event.body) }
		)
	)
	.then(res => {
		console.log('New character created successfully.')
		return {
			statusCode: 200,
			body: JSON.stringify(res)
		}
	}).catch(err => {
		console.log('Failed to create new character.')
		return {
			statusCode: 400,
			body: JSON.stringify(err)
		}
	})
}