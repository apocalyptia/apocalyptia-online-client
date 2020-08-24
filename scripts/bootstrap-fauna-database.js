const faunadb = require('faunadb')
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query

if (!process.env.FAUNADB_SERVER_SECRET) {
	if (insideNetlify) process.exit(1)
}

if (process.env.FAUNADB_SERVER_SECRET) {
	createFaunaDB(process.env.FAUNADB_SERVER_SECRET)
}

function createFaunaDB(key) {
	const client = new faunadb.Client({ secret: key })
	return client.query(
		q.Create(
			q.Ref('classes'),
			{
				name: 'characters'
			}
		)
	)
	.then(() => {
		return client.query(
			q.Create(
				q.Ref('indexes'),
				{
					name: 'all_characters',
					source: q.Ref('classes/characters')
				}
			)
		)
	})
}

function insideNetlifyBuildContext() {
	if (process.env.DEPLOY_PRIME_URL) return true
	return false
}
