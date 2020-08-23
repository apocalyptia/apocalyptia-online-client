import { api } from '../../../../scripts/netlify/api/api'
import CompressCharacter from './CompressCharacter'


const finalizeCharacter = (user, character) => {
    if (!character.created) character.created = new Date()
    character.user = user
    character.completed = true
    character.step = `complete`
    character.modified = new Date()
    return character
}

const saveLocal = (character) => {
    const jsonChar = JSON.stringify(character)
    window.localStorage.setItem(`character`, jsonChar)
}

const saveRemote = (user, character) => {
    const compressedCharacter = CompressCharacter(character)
    api.createCharacter(user, compressedCharacter)
}

export default (user, character) => {
    character = finalizeCharacter(user, character)
    saveLocal(character)
    saveRemote(user, character)
    return character
}