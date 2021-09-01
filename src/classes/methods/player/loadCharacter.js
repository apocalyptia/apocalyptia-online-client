import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'

export default function({ id='', character='' }) {
	let loadedCharacter = null
	if (id) {
		loadedCharacter = decompressCharacter(window.localStorage.getItem(id))
	} else if (character) {
		loadedCharacter = decompressCharacter(window.localStorage.getItem(character.meta.id))
	}
	return loadedCharacter
}