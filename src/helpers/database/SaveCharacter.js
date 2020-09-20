import CompressCharacter from './CompressCharacter'

export default (character) => {
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
		res.json()
	})
	.catch(err => {
		console.warn(`SaveCharacter CATCH ERR = ${err}`)
	})
}