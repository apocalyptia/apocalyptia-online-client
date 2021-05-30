import readAllCharacters from '/src/utils/database/characters/readAllCharacters.js'

export default (p) => {
	p.characterList = readAllCharacters()
}
