import CompressCharacter from './CompressCharacter'


const finalizeCharacter = (user, character) => {
    if (!character.created) character.created = new Date()
    character.data.user = user
    character.data.completed = true
    character.data.step = `complete`
    character.data.modified = new Date()
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
    })
        .then(res => {
            console.log('SUCCESS!')
            console.log(res)
        })
        .catch(err => {
            console.log('ERROR!')
            console.log(err)
        })
    return character
}