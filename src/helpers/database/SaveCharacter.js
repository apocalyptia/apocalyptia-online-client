import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`SAVE CHARACTER ID = ${character.id}`)
	return fetch(
		`/.netlify/functions/character-create`,
		{
			method: `POST`,
			body: JSON.stringify(CompressCharacter(character))
		}
	).then(res => res.json())
}