import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'

function readAllCharacters() {
	if (window.localStorage.length) {
		return Object.keys(window.localStorage).map((c) => {
			const storedCharacter = window.localStorage.getItem(c)
			const unzippedCharacter = decompressCharacter(storedCharacter)
			return unzippedCharacter
		})
	}
	return []
}

export default readAllCharacters