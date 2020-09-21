import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`CHARACTER = ${character}`)
	return fetch(
		`https://apocalyptiaonline.com/.netlify/functions/character-create`,
		{
			method: `POST`,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(CompressCharacter(character))
		}
	)
	.then(res => {
		console.log(`SaveCharacter THEN RES = ${res.json()}`)
		res.json()
	})
	.catch(err => {
		console.warn(`SaveCharacter CATCH ERR = ${err}`)
	})
}