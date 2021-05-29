import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'

export default (name) => {
	const locallyStoredCharacter = window.localStorage.getItem(name)
	const jsonParsedCharacter = JSON.parse(locallyStoredCharacter)
	const decompressedCharacter = decompressCharacter(jsonParsedCharacter)
	return decompressedCharacter
}