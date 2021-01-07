import CompressCharacter from 'database/characters/CompressCharacter.js'

export default (character) => {
	const compressedCharacter = CompressCharacter(character)
	const jsonStringifiedCharacter = JSON.stringify(compressedCharacter)
	const characterBlob = new Blob(
		[ jsonStringifiedCharacter ],
		{ type: 'text/plain' }
	)
	const url = window.URL.createObjectURL(characterBlob)
	const a = document.createElement("a")
	a.href = url
	a.download = character.description.name.value
	a.click()
	window.URL.revokeObjectURL(url)
}