export default function() {
	const storedCharacterIds = Object.keys(window.localStorage)
	this.list = storedCharacterIds.map((key) => this.loadCharacter({ id: key }))
}