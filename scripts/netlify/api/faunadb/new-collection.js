const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET
})

const characterQuery = q.Create(
	q.Ref('characters'), {
		data: JSON.parse(event.body)
	}
)

const successResponse = (res) => {
	return {
		statusCode: 200,
		body: JSON.stringify(res)
	}
}

const failureResponse = (res) => {
	return {
		statusCode: 400,
		body: JSON.stringify(err)
	}
}

exports.handler = async (event) => {
	return client.query(characterQuery)
		.then(successResponse(res))
		.catch(failureResponse(res))
}