export default function() {
	this.list = Object.keys(window.localStorage).map((key) => this.loadCharacter({ id: key }))
}