// import { faunadb } from 'faunadb'

// const q = faunadb.query

// exports.handler = (event) => {
// 	const client = new faunadb.Client({
// 		secret: process.env.FAUNADB_SERVER_SECRET
// 	})

// 	const { userId, character, commandName } = event.body

// 	const command = {
// 		createCharacter: q.Create(
// 			q.Collection(`Characters`),
// 			{ data: character }
// 		),
// 		readCharacter: q.Get(
// 			q.Match(
// 				q.Index(`userID`),
// 				{ data: userId }
// 			)
// 		),
// 		readAllCharacters: q.Get(
// 			q.Match(
// 				q.Index(`userID`),
// 				userID
// 			)
// 		),
// 		updateCharacter: q.Update(
// 			q.Collection(`characters`),
// 			{ data: character }
// 		),
// 		deleteCharacter: q.Delete(
// 			q.Ref(
// 				q.Collection(`Characters`), {
// 					data: JSON.parse(character)
// 				}
// 			)
// 		)
// 	}

// 	return client.query(command[commandName]).then(res => {
// 		if (commandName == `readAllCharacters`) {
// 			return client.query(
// 				res.data.map(ref => q.Get(ref))
// 			)
// 			.then(ret => {
// 				return {
// 					statusCode: 200,
// 					body: JSON.stringify(ret.ref)
// 				}
// 			})
// 		}
// 		else {
// 			return {
// 				statusCode: 200,
// 				body: JSON.stringify(res.ref)
// 			}
// 		}
// 	}).catch(err => {
// 		return {
// 			statusCode: 400,
// 			body: JSON.stringify(err)
// 		}
// 	})
// }