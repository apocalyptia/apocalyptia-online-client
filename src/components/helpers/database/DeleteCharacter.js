import Character from "../../rules/Character"
import { api } from '../../../../utils/api'

export default (character) => {
	window.localStorage.removeItem('character')
    window.location.href = '/'
	const jsonChar = JSON.stringify(character)
    api.delete(jsonChar)
    return new Character()
}