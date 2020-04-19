const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

exports.handler = (event) => {
	const data = JSON.parse(event.body)
	const id = getId(event.path)
	return client.query(
		q.Update(
			q.Ref(`classes/character/${id}`),
			{ data }
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