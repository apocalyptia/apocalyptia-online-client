import compressCharacter from '$utils/database/characters/compressCharacter.js'

export default function() {
	if (this.selected) {
		const blob = new Blob(
			[ compressCharacter(this.selected) ],
			{ type: `text/plain` }
		)
		const url = window.URL.createObjectURL(blob)
		const a = document.createElement(`a`)
		a.href = url
		a.download = this.selected.description.name.value
		a.click()
		window.URL.revokeObjectURL(url)
	}
	return this
}