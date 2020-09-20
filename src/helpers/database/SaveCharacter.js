import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`ATTEMPTING TO SAVE`)
	console.log(`COMPRESSED = ${CompressCharacter(character)}`)
	console.log(`JSON STRINGIFIED = ${JSON.stringify(CompressCharacter(character))}`)
	return fetch(
		`https://apocalyptiaonline.com/.netlify/functions/character-create`,
		{
			method: `POST`,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(CompressCharacter(character))
		}
	)
	.then(res => res.json())
	.catch(err => {
		console.warn(`CATCH ERROR = ${err}`)
		window.localStorage.setItem(`character`, character)
	})
}