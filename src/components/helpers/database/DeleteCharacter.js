import Character from "../../rules/Character"
import { api } from '../../../../scripts/netlify/api/api'

export default (user, character) => {
	window.localStorage.removeItem('character')
	const jsonChar = JSON.stringify(character)
    // api.deleteCharacter(user, jsonChar)
    return new Character()
}