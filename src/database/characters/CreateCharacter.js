import CompressCharacter from '$database/characters/CompressCharacter.js'
import SaveCharacter from '$database/characters/SaveCharacter.js'

export default (character) => {
	const compressedCharacter = CompressCharacter(character)
	const jsonStringifiedCharacter = JSON.stringify(compressedCharacter)
	SaveCharacter(character.description.name.value, jsonStringifiedCharacter)
}