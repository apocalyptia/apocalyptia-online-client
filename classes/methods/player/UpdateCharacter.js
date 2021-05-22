import UpdateCharacter from '/src/utils/database/characters/UpdateCharacter.js'

export default (p, c) => {
	p.characterList.push(c)
	p.currentCharacterIndex = p.characterList.length - 1
	UpdateCharacter(c)
}