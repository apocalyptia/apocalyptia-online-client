import DecompressCharacter from './DecompressCharacter'
import { userId } from 'stores/netlifyStore.js'

export default () => {
	return fetch(
		`/.netlify/functions/character-read`, {
			method: `POST`,
			body: JSON.stringify(userId)
		}
	)
	.then(res => res.json())
}