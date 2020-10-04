import DecompressCharacter from './DecompressCharacter'

export default (userId) => {
	return fetch(
		`/.netlify/functions/character-read-all`,
		{
			method: `POST`,
			body: JSON.stringify(userId)
		}
	).then(res => {
		console.log(`LOAD ALL CHARACTERS = ${JSON.parse(res)}`)
		return DecompressCharacter(res.json().body.character)
	})
}