import CompressCharacter from './CompressCharacter'

export default (character) => {
	console.log(`Attempting to save character.`)
	console.log(CompressCharacter(character))
	console.log(JSON.stringify(CompressCharacter(character)))
	fetch(
		`/.netlify/functions/character-create`,
		{
			method: `POST`,
			// headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(CompressCharacter(character))
		}
	)
	.then(res => {
		console.log(`Successfully saved character to database.`)
		console.log(response)
		return res.json()
	})
	.catch(err => {
		console.log(`Failed to save character to database`)
		console.log(err)
		window.localStorage.setItem(`character`, character)
	})
}