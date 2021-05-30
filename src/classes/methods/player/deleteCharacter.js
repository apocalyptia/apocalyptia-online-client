// import deleteCharacter from '/src/utils/database/characters/deleteCharacter.js'
import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'
import characterStore from '/src/stores/characterStore.js'
import { get } from 'svelte/store'

export default (player, characterName) => {
	if (player.characterList.length) {
		player.characterList = player.characterList.filter((c) => {
			const char = decompressCharacter(c)
			char.description.name.value != characterName
		})
		player.characterIndex = player.characterList.length - 1
		let character = get(characterStore)
		if (player.characterList.length) {
			character = decompressCharacter(player.characterList[player.characterIndex])
		} else {
			character = null
		}
		window.localStorage.setItem(player.email, JSON.stringify(player))
		return character
	}
}
