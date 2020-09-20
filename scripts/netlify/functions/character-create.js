const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event) => {
	const client = new faunadb.Client({
		secret: process.env.FAUNADB_SERVER_SECRET
	})

	console.log('SAVING CHARACTER TO FAUNADB')

	console.log(`EVENT = ${event}`)

	console.log(`EVENT.BODY = ${event.body}`)

	const character = JSON.parse(event.body)

	console.log(`JSON PARSED EVENT.BODY = ${character}`)

	return client.query(
		q.Create(
			q.Ref(
				q.Collection(`characters`)
			),
			{ data: character }
		)
	)
		.then(res => {
			console.log('SUCCESS!')
			console.log(`RES = ${res}`)
			console.log(`JSON STRINGIFIED RES = ${JSON.stringify(res)}`)
			return {
				statusCode: 200,
				body: JSON.stringify(res)
			}
		})
		.catch(err => {
			console.log('FAILURE!')
			console.log(`ERR = ${err}`)
			console.log(`JSON STRINGIFIED ERR = ${JSON.stringify(err)}`)
			return {
				statusCode: 400,
				body: JSON.stringify(err)
			}
		})
}