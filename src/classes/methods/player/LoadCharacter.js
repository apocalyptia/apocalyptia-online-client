// import ReadCharacter from 'database/characters/ReadCharacter.js'
import DecompressCharacter from 'database/characters/DecompressCharacter.js'
import characterStore from 'stores/characterStore.js'
import { get } from 'svelte/store'

export default (player, characterName) => {
	if (player.characterList.length) {
		player.characterIndex = player.characterList.findIndex(c => {
			const char = DecompressCharacter(c)
			return char.description.name.value == characterName
		})
		if (player.characterIndex > -1) {
			let character = get(characterStore)
			character = DecompressCharacter(player.characterList[player.characterIndex])
		}
	}
}