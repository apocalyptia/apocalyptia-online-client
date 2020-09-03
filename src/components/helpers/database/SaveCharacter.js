import CompressCharacter from './CompressCharacter'


const finalizeCharacter = (user, c) => {
    if (!c.created) c.created = new Date()
    c.meta.user = user
    c.meta.completed = true
    c.meta.step = `complete`
    c.meta.modified = new Date()
    return c
}

const saveLocal = (c) => {
    window.localStorage.setItem(`character`, c)
}

export default (user, c) => {
    c = finalizeCharacter(user, c)
    const characterFile = JSON.stringify(CompressCharacter(c))
    saveLocal(characterFile)
    fetch(`/.netlify/functions/character-create`, {
		body: {
            user: user,
            character: characterFile
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
    return c
}