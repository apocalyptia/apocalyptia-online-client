import compressCharacter from '/src/utils/database/characters/compressCharacter.js'

export default (player, character) => {
	player.characterList.push(compressCharacter(character))
	player.characterIndex = player.characterList.length - 1
	window.localStorage.setItem(player.email, JSON.stringify(player))
}
