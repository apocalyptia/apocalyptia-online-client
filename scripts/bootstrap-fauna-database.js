/* bootstrap database in your FaunaDB account */
const readline = require('readline')
const faunadb = require('faunadb')
const chalk = require('chalk')
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query

console.log(chalk.cyan(`Creating your FaunaDB Database...\n`))

if (!process.env.FAUNADB_SERVER_SECRET) {
	console.log(chalk.yellow(`Required "FAUNADB_SERVER_SECRET" enviroment variable not found.`))
	if (insideNetlify) {
		console.log(`Visit https://app.netlify.com/sites/apocalyptia-online/settings/deploys and set a "FAUNADB_SECRET" value in the "Build environment variables" section`)
		process.exit(1)
	}
	if (!insideNetlify) {
		console.log(`\nYou can create fauna DB keys here: https://dashboard.fauna.com/db/keys\n`)
		ask(chalk.bold(`Enter your faunaDB server key`), (err, answer) => {
			if (!answer) {
				console.log(`Please supply a faunaDB server key`)
				process.exit(1)
			}
			createFaunaDB(process.env.FAUNADB_SERVER_SECRET)
				.then(() => console.log(`Database created`))
		})
	}
}

if (process.env.FAUNADB_SERVER_SECRET) {
	createFaunaDB(process.env.FAUNADB_SERVER_SECRET)
		.then(() => console.log(`Database created`))
}

function createFaunaDB(key) {
	console.log(`Create the database!`)
	const client = new faunadb.Client({ secret: key })
	/* Based on your requirements, change the schema here */
	return client.query(
		q.Create(
			q.Ref(`apocalyptia-online`), {
				name: `users`
			}
		)
	)
	.then(() => {
		return client.query(
			q.Create(
				q.Ref(`indexes`), {
					name: `all_users`,
					source: q.Ref(`apocalyptia-online/users`)
				}
			)
		)
	}).catch(e => {
		if (e.requestResult.statusCode === 400 && e.message === `instance not unique`) {
			console.log(`DB already exists`)
			throw e
		}
	})
}

function insideNetlifyBuildContext() {
	if (process.env.DEPLOY_PRIME_URL) return true
	return false
}

function ask(question, callback) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})
	rl.question(question + '\n', function (answer) {
		rl.close()
		callback(null, answer)
	})
}