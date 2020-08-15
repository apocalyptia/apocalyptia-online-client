import { api } from '../../../../scripts/netlify/api/api'

export default (character, user) => {
    if (!character.created) character.created = new Date()
    character.user = user
    character.completed = true
    character.step = `complete`
	character.modified = new Date()
	const jsonChar = JSON.stringify(character)
    window.localStorage.setItem('character', jsonChar)
    api.createCharacter(jsonChar)
    return character
}