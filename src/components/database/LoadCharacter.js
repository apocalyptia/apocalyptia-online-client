import DecompressCharacter from 'database/DecompressCharacter.js'

export default (userId) => {
	return fetch(
		`/.netlify/functions/character-read`, {
			method: `POST`,
			body: JSON.stringify(userId)
		}
	)
	.then(res => DecompressCharacter(res.json()))
}