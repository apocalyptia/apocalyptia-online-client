import CompressCharacter from 'database/characters/CompressCharacter.js'
import characterStore from 'stores/characterStore.js'

export default _ => {
	let character
	characterStore.subscribe(c => character = c)
	window.localStorage.setItem(character.meta.id, CompressCharacter(character))
}