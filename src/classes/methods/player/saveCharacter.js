import compressCharacter from '/src/utils/database/characters/compressCharacter.js'
import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'

export default (player, character) => {
	if (!player.characterList.some(c => {
		const char = decompressCharacter(c)
		char.description.name.value === character.description.name.value
	})) {
		player.characterList.push(compressCharacter(character))
		player.characterIndex = player.characterList.length - 1
	}
	else {
		player.characterIndex = player.characterList.findIndex(c => {
			const char = decompressCharacter(c)
			return char.description.name.value === character.description.name.value
		})
		player.characterList[player.characterIndex] = compressCharacter(character)
	}
	window.localStorage.setItem(player.email, JSON.stringify(player))
}