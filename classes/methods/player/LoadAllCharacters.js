import ReadAllCharacters from '/src/utils/database/characters/ReadAllCharacters.js'

export default (p) => {
	p.characterList = ReadAllCharacters()
}