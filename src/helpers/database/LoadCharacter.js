import DecompressCharacter from './DecompressCharacter'

export default (userId) => {
	console.log(`USER ID = ${userId}`)
	console.log(`USER ID JSON = ${JSON.stringify(userId)}`)
	return fetch(
		`/.netlify/functions/character-read`, {
			method: `POST`,
			body: JSON.stringify(userId)
		}
	).then(res => {
		console.log(`RES.JSON = ${res.json()}`)
		return res.json()
	})
}