const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

exports.handler = async (event) => {
	const data = JSON.parse(event.body)
	const characterItem = { data: data }
	console.log('Creating a new character.')
	return client.query(
		q.Create(
			q.Collection('characters'),
			characterItem
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