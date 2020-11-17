import DecompressCharacter from 'database/DecompressCharacter.js'
import { user } from 'stores/userStore.js'

export default (name) => {
	const locallyStoredCharacter = window.localStorage.getItem(name)
	const jsonParsedCharacter = JSON.parse(locallyStoredCharacter)
	const decompressedCharacter = DecompressCharacter(jsonParsedCharacter)
	user.update(u => u.currentCharacter = decompressedCharacter.description.name.value)
	return decompressedCharacter
}