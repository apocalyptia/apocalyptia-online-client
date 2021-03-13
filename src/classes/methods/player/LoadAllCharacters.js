import ReadAllCharacters from 'database/characters/ReadAllCharacters.js'

export default (p) => {
	p.characterList = ReadAllCharacters()
}