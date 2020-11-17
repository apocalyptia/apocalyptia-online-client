import DecompressCharacter from 'database/DecompressCharacter.js'

export default _ => {
	return Object.keys(window.localStorage).map(c => {
		return DecompressCharacter(JSON.parse(window.localStorage.getItem(c)))
	})
}