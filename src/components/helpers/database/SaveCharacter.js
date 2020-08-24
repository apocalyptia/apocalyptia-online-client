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

export default (user, character) => {
    character = finalizeCharacter(user, character)
    saveLocal(character)
    fetch(`/.netlify/functions/character-create`, {
		body: JSON.stringify(CompressCharacter(character)),
		method: `POST`
	}).then(res => console.log(res))
    return character
}