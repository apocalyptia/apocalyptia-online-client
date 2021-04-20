import CompressCharacter from '/src/utils/database/characters/CompressCharacter.js'

export default (player, character) => {
	player.characterList.push(CompressCharacter(character))
	player.characterIndex = player.characterList.length - 1
	window.localStorage.setItem(player.email, JSON.stringify(player))
}