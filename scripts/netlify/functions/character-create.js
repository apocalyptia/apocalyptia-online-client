const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	console.log('character-create SAVING CHARACTER TO FAUNADB')

	console.log(`character-create EVENT = ${event}`)

	console.log(`character-create EVENT.BODY = ${event.body}`)

	const character = JSON.parse(event.body)

	console.log(`character-create JSON PARSED EVENT.BODY = ${character}`)

	return client.query(
		q.Create(
			q.Ref(
				q.Collection(`characters`)
			),
			{ data: character }
		)
	)
		.then(res => {
			console.log('character-create SUCCESS!')
			console.log(`character-create RES = ${res}`)
			console.log(`character-create JSON STRINGIFIED RES = ${JSON.stringify(res)}`)
			return {
				statusCode: 200,
				body: JSON.stringify(res)
			}
		})
		.catch(err => {
			console.log('character-create FAILURE!')
			console.log(`character-create ERR = ${err}`)
			console.log(`character-create JSON STRINGIFIED ERR = ${JSON.stringify(err)}`)
			return {
				statusCode: 400,
				body: JSON.stringify(err)
			}
		})
}