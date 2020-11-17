import CompressCharacter from 'database/CompressCharacter.js'
import { user } from 'stores/userStore.js'

export default (character) => {
	user.update(u => {
		u.currentCharacter = character
		return u
	})
	const compressedCharacter = CompressCharacter(character)
	const jsonStringifiedCharacter = JSON.stringify(compressedCharacter)
	window.localStorage.setItem(
		character.description.name.value,
		jsonStringifiedCharacter
	)
}