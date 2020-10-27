import CompressCharacter from 'database/CompressCharacter.js'

export default (userId, character) => {
	$character.finalize(userId)

	return fetch(
		`/.netlify/functions/character-create`, {
			method: `POST`,
			body: JSON.stringify(CompressCharacter(character))
		}
	)
	.then(res => res.json())
}