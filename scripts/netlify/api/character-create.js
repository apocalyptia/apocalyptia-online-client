const faunadb = require('faunadb')

const q = faunadb.query

const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event) => {
	return client.query(
		q.Create(
			q.Ref(`characters/createCharacter`),
			{
				data: JSON.parse(event.body)
			}
		)
	)
		.then((res) => {
			return {
				statusCode: 200,
				body: JSON.stringify(res)
			}
		})
		.catch((err) => {
			return {
				statusCode: 400,
				body: JSON.stringify(err)
			}
		})
}