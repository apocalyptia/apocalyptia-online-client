import { api } from '../../../../scripts/netlify/api/api'
import Character from "../../rules/Character"


const deleteLocal = () => {
    window.localStorage.removeItem(`character`)
}

const deleteRemote = (user, character) => {
    const jsonChar = JSON.stringify(character)
    api.deleteCharacter(user, jsonChar)
}

export default (user, character) => {
    deleteLocal()
    deleteRemote(user, character)
    return new Character()
}