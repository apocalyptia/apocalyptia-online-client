import DecompressCharacter from 'database/DecompressCharacter.js'

export default (name) => {
	const locallyStoredCharacter = window.localStorage.getItem(name)
	const jsonParsedCharacter = JSON.parse(locallyStoredCharacter)
	const decompressedCharacter = DecompressCharacter(jsonParsedCharacter)
	return decompressedCharacter
}