function updateCharacter(p, c) {
	p.characterList.push(c)
	p.currentCharacterIndex = p.characterList.length - 1
}

export default updateCharacter
