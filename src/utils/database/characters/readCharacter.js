import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'

function readCharacter(name) {
	const locallyStoredCharacter = window.localStorage.getItem(name)
	const jsonParsedCharacter = JSON.parse(locallyStoredCharacter)
	const decompressedCharacter = decompressCharacter(jsonParsedCharacter)
	return decompressedCharacter
}

export default readCharacter
