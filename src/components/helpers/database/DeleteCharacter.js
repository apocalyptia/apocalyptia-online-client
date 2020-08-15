import Character from "../../rules/Character"
import { api } from '../../../../scripts/netlify/api/api'

export default (character) => {
	window.localStorage.removeItem('character')
    window.location.href = '/'
	const jsonChar = JSON.stringify(character)
    api.deleteCharacter(jsonChar)
    return new Character()
}