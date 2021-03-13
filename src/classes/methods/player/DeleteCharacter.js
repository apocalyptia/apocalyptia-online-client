// import DeleteCharacter from 'database/characters/DeleteCharacter.js'
import DecompressCharacter from 'database/characters/DecompressCharacter.js'
import characterStore from 'stores/characterStore.js'
import { get } from 'svelte/store'

export default (player, characterName) => {
	if (player.characterList.length) {
		player.characterList = player.characterList.filter(c => {
			const char = DecompressCharacter(c)
			char.description.name.value != characterName
		})
		player.characterIndex = player.characterList.length - 1
		let character = get(characterStore)
		if (player.characterList.length) {
			character = DecompressCharacter(player.characterList[player.characterIndex])
		}
		else character = null
		window.localStorage.setItem(player.email, JSON.stringify(player))
	}
}