const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

exports.handler = async (event) => {
	const id = getId(event.path)
	return client.query(
		// q.Delete(
		// 	q.Ref(`classes/character/${id}`)
		// )
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