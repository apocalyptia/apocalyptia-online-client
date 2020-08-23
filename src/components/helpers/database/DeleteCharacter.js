import api from './api'
import Character from "../../rules/Character"


const deleteLocal = () => {
    window.localStorage.removeItem(`character`)
}

const deleteRemote = (user, character) => {
    const jsonChar = JSON.stringify(character)
    api('delete-character', user, jsonChar)
}

export default (user, character) => {
    // deleteLocal()
    deleteRemote(user, character)
    return new Character()
}