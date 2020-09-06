import Character from '../../rules/Character'

export default (userId) => {
	console.log(`Attempting to delete character.`)
	console.log(userId)
	fetch(
		`/.netlify/functions/character-delete`,
		{
			method: `POST`,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId })
		}
	)
	.then(res => {
		let response = res.json()
		console.log(`Successfully saved character to database.`)
		console.log(response)
		return new Character()
	})
	.catch(err => {
		console.log(`Failed to delete character from database.`)
		console.log(err)
		window.localStorage.removeItem(`character`)
	})
}