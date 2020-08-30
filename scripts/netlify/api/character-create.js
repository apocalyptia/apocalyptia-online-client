const faunadb = require('faunadb')

const q = faunadb.query

const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET
})

const CreateCharacterQuery = (event) => {
	q.Create(
		q.Ref(`characters/CreateCharacter`),
		{ data: JSON.parse(event.body.character) }
	)
}

exports.handler = async (event) => {
	client.query(CreateCharacterQuery(event))
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