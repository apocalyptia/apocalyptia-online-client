import CompressCharacter from './CompressCharacter'


const finalizeCharacter = (user, character) => {
    if (!character.created) character.created = new Date()
    character.meta.user = user
    character.meta.completed = true
    character.meta.step = `complete`
    character.meta.modified = new Date()
    return character
}

const createLocal = (character) => {
    window.localStorage.setItem(`character`, character)
}

export default (user, character) => {
    character = finalizeCharacter(user, character)
    createLocal(character)
    fetch(`/.netlify/functions/character-create`, {
		body: {
            user: user,
            character: JSON.stringify(CompressCharacter(character))
        },
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