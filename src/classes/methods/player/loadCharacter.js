// import readCharacter from '/src/utils/database/characters/readCharacter.js'
import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'
import characterStore from '/src/stores/characterStore.js'
import { get } from 'svelte/store'

export default (player, characterName) => {
	if (player.characterList.length) {
		player.characterIndex = player.characterList.findIndex((c) => {
			const char = decompressCharacter(c)
			return char.description.name.value === characterName
		})
		if (player.characterIndex > -1) {
			let character = get(characterStore)
			character = decompressCharacter(player.characterList[player.characterIndex])
			return character
		}
	}
}
