import DecompressCharacter from './DecompressCharacter'

export default (userId) => {
	return fetch(
		`/.netlify/functions/character-read-all`, {
			method: `POST`,
			body: JSON.stringify(userId)
		}
	).then(res => res.json())
}