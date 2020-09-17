import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`Attempting to save character.`)
	console.log(CompressCharacter(character))
	console.log(JSON.stringify(CompressCharacter(character)))
	return fetch(
		`https://apocalyptiaonline.com/.netlify/functions/character-create`,
		{
			method: `POST`,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(CompressCharacter(character))
		}
	)
	.then(res => {
		console.log(`FETCH RESPONSE = ${res}`)
		console.log(`FETCH RESPONSE JSON = ${res.json()}`)
		return res.json()
	})
	.catch(err => {
		console.warn(`CATCH ERROR = ${err}`)
		window.localStorage.setItem(`character`, character)
	})
}