import Character from "../../rules/Character"
import api from '../../../../utils/api'

export default (character) => {
	window.localStorage.removeItem('character')
	const jsonChar = JSON.stringify(character)
    api.deleteCharacter(jsonChar)
    window.location.href = '/'
    return new Character()
}