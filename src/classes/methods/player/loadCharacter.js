import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'

export default function({ id, character }) {
	if (id || character) {
		return decompressCharacter(window.localStorage.getItem(id || character.meta.id))
	}
	else {
		return null
	}
}