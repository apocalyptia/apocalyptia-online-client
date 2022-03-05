import compressCharacter from '$utils/database/characters/compressCharacter.js'

export default function(character) {
	this.selected = character
	window.localStorage.setItem(character.meta.id, compressCharacter(character))
	this.readCharacters()
	return this
}