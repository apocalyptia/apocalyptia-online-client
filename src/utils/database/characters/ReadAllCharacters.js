import DecompressCharacter from '/src/utils/database/characters/DecompressCharacter.js'

export default () => {
	if (window.localStorage.length) {
		return Object.keys(window.localStorage).map(c => {
			const storedCharacter = window.localStorage.getItem(c)
			const unzippedCharacter = DecompressCharacter(storedCharacter)
			return unzippedCharacter
		})
	}
	return []
}