import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`Attempting to save character.`)
	console.log(CompressCharacter(character))
	console.log(JSON.stringify(CompressCharacter(character)))
	return fetch(
		`/.netlify/api/character-create`,
		{
			method: `POST`,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(CompressCharacter(character))
		}
	)
	.then(res => {
		console.log(`Successfully saved character to database.`)
		console.log(res)
		return res.json()
	})
	.catch(err => {
		console.log(`Failed to save character to database`)
		console.warn(err)
		window.localStorage.setItem(`character`, character)
	})
}