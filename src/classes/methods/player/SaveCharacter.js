import CompressCharacter from '/src/utils/database/characters/CompressCharacter.js'
import DecompressCharacter from '/src/utils/database/characters/DecompressCharacter.js'

export default (player, character) => {
	if (!player.characterList.some(c => {
		const char = DecompressCharacter(c)
		char.description.name.value === character.description.name.value
	})) {
		player.characterList.push(CompressCharacter(character))
		player.characterIndex = player.characterList.length - 1
	}
	else {
		player.characterIndex = player.characterList.findIndex(c => {
			const char = DecompressCharacter(c)
			return char.description.name.value === character.description.name.value
		})
		player.characterList[player.characterIndex] = CompressCharacter(character)
	}
	window.localStorage.setItem(player.email, JSON.stringify(player))
}