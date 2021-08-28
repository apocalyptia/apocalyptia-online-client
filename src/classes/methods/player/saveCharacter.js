import compressCharacter from '/src/utils/database/characters/compressCharacter.js'

export default function(character) {
	this.selected = character
	window.localStorage.setItem(character.meta.id, compressCharacter(character))
	this.readCharacter()
}