import updateCharacter from '/src/utils/database/characters/updateCharacter.js'

export default (p, c) => {
	p.characterList.push(c)
	p.currentCharacterIndex = p.characterList.length - 1
	updateCharacter(c)
}