export default function(character) {
	window.localStorage.removeItem(character.meta.id)
	this.initializePlayer()
	return this
}