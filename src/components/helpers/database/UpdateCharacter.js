import CompressCharacter from './CompressCharacter'


const updateLocal = (c) => {
    window.localStorage.setItem(`character`, c)
}

export default (user, c) => {
    const characterFile = JSON.stringify(CompressCharacter(c))
    updateLocal(characterFile)
    fetch(`/.netlify/functions/character-update`, {
		body: {
            user: user,
            character: characterFile,
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