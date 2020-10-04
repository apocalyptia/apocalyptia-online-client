import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`CHARACTER = ${character}`)
	console.log(`CHARACTER JSON = ${JSON.stringify(character)}`)
	console.log(`CHARACTER JSON COMPRESSED = ${CompressCharacter(character)}`)
	return fetch(
		`/.netlify/functions/character-create`, {
			method: `POST`,
			body: JSON.stringify(CompressCharacter(character))
		}
	).then(res => {
		console.log(`RES.JSON = ${res.json()}`)
		return res.json()
	})
}