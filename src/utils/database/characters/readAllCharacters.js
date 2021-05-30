import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'

export default () => {
	if (window.localStorage.length) {
		return Object.keys(window.localStorage).map((c) => {
			const storedCharacter = window.localStorage.getItem(c)
			const unzippedCharacter = decompressCharacter(storedCharacter)
			return unzippedCharacter
		})
	}
	return []
}
