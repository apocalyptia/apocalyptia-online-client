import CharacterStore from '/src/classes/stores/CharacterStore.js'

export default function(character) {
	if (character.meta.id === get(characterStore).meta.id) {
		characterStore.set(new CharacterStore())
	}
	window.localStorage.removeItem(character.meta.id)
	this.readCharacter()
}