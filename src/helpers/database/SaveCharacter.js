import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`CHARACTER = ${JSON.stringify(CompressCharacter(character))}`)
	return fetch(
		`/.netlify/functions/character-create`,
		{
			method: `POST`,
			body: JSON.stringify(CompressCharacter(character))
		}
	).then(res => res.json())
}