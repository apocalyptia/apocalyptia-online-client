export default (character) => {
	return fetch(
		`/.netlify/functions/character-delete`,
		{
			method: `POST`,
			body: JSON.stringify(character.id)
		}
	).then(res => res.json())
}