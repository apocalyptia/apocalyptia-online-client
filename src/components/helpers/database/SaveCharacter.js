import { character } from 'stores/characterStore.js'
import { userId } from 'stores/netlifyStore.js'
import CompressCharacter from './CompressCharacter'

export default () => {
	$character.finalize(userId)

	return fetch(
		`/.netlify/functions/character-create`, {
			method: `POST`,
			body: JSON.stringify(CompressCharacter($character))
		}
	)
	.then(res => res.json())
}