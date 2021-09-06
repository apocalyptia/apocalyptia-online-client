export default function() {
	this.readCharacters()
	this.selected = this.list[0] || null
	return this
}