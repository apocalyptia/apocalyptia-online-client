import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`SaveCharacter ATTEMPTING TO SAVE`)
	console.log(`SaveCharacter COMPRESSED = ${CompressCharacter(character)}`)
	console.log(`SaveCharacter JSON STRINGIFIED = ${JSON.stringify(CompressCharacter(character))}`)
	return fetch(
		`https://apocalyptiaonline.com/.netlify/functions/character-create`,
		{
			method: `POST`,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(CompressCharacter(character))
		}
	)
	.then(res => {
		console.log(`SaveCharacter THEN RES = ${res}`)
		console.log(`SaveCharacter THEN RES.JSON = ${res.json()}`)
		res.json()
	})
	.catch(err => {
		console.warn(`SaveCharacter CATCH ERR = ${err}`)
		console.warn(`SaveCharacter CATCH ERR.JSON = ${err.json()}`)
		window.localStorage.setItem(`character`, character)
	})
}