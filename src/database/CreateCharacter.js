import CompressCharacter from 'database/CompressCharacter.js'
import SaveCharacter from 'database/SaveCharacter.js'

export default (character) => {
	const compressedCharacter = CompressCharacter(character)
	const jsonStringifiedCharacter = JSON.stringify(compressedCharacter)
	SaveCharacter(character.description.name.value, jsonStringifiedCharacter)
}