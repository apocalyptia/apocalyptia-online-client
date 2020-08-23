import { api } from '../../../../scripts/netlify/api/api'
import CompressCharacter from './CompressCharacter'

export default (user, character) => {
    if (!character.created) {
        character.created = new Date()
    }
    character.user = user
    character.completed = true
    character.step = `complete`
	character.modified = new Date()
	const jsonChar = JSON.stringify(character)
    window.localStorage.setItem('character', jsonChar)
    const compressedCharacter = CompressCharacter(character)
    // if (api.readCharacter(user, jsonChar)) {
    //     api.updateCharacter(user, jsonChar)
    // }
    // else {
    api.createCharacter(user, compressedCharacter)
    // }
    return character
}