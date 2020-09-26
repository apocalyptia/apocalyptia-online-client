import DecompressCharacter from './DecompressCharacter'

export default (userId) => {
	return fetch(
		`/.netlify/functions/character-read`,
		{
			method: `POST`,
			body: JSON.stringify(userId)
		}
	).then(res => {
		console.log(`RESPONSE = ${res}`)
		DecompressCharacter(res.json().body.character)
	})
}