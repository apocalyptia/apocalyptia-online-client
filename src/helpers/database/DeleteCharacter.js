export default (character) => {
	console.log(`DELETE CHARACTER ID = ${character.id}`)
	return fetch(
		`/.netlify/functions/character-delete`,
		{
			method: `POST`,
			body: JSON.stringify({ userId })
		}
	).then(res => res.json())
}