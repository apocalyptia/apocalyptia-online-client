import DecompressCharacter from './DecompressCharacter'

export default async (userId) => {
	return await fetch(
		`/.netlify/functions/character-read-all`,
		{
			method: `POST`,
			body: JSON.stringify(userId)
		}
	).then(res => res.json())
}