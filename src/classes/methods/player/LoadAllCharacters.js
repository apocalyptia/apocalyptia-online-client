import ReadAllCharacters from '/src/database/characters/ReadAllCharacters.js'

export default (p) => {
	p.characterList = ReadAllCharacters()
}