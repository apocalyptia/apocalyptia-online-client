import { api } from '../../../../scripts/netlify/api/api'

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
    // if (api.readCharacter(user, jsonChar)) {
    //     api.updateCharacter(user, jsonChar)
    // }
    // else {
    //     api.createCharacter(user, jsonChar)
    // }
    return character
}