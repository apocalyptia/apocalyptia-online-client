import DecompressCharacter from 'src/components/helpers/database/DecompressCharacter'

export default (userId) => {
	console.log(`Attempting to load character.`)
	console.log(userId)
	console.log(JSON.stringify({ userId }))
	fetch(
		`/.netlify/functions/character-read`,
		{
			method: `POST`,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId })
		}
	)
	.then(res => {
		let response = res.json()
		let character = DecompressCharacter(response.body.character)
		console.log(`Successfully loaded character from database.`)
		console.log(response)
		return character
	})
	.catch(err => {
		console.log(`Failed to load character from database.`)
		console.log(err)
		return window.localStorage.getItem(`character`)
	})
}