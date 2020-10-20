import { userId } from 'stores/netlifyStore.js'

export default () => {
	return fetch(
		`/.netlify/functions/character-delete`, {
			method: `POST`,
			body: JSON.stringify(userId)
		}
	).then(res => res.json())
}