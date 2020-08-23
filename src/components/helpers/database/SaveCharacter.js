import CompressCharacter from './CompressCharacter'


const finalizeCharacter = (user, character) => {
    if (!character.created) character.created = new Date()
    character.user = user
    character.completed = true
    character.step = `complete`
    character.modified = new Date()
    return character
}

// const saveLocal = (character) => {
//     const jsonChar = JSON.stringify(character)
//     window.localStorage.setItem(`character`, jsonChar)
// }

export default (user, character) => {
    character = finalizeCharacter(user, character)
    fetch(`/.netlify/functions/create-character`, {
		body: JSON.stringify(CompressCharacter(character)),
		method: `POST`
	}).then(res => res.json())
    return character
}