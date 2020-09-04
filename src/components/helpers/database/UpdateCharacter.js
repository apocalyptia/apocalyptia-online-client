import CompressCharacter from './CompressCharacter'


const updateLocal = (character) => {
    window.localStorage.setItem(`character`, character)
}

export default (user, character) => {
    updateLocal(character)
    fetch(`/.netlify/functions/character-update`, {
		body: {
            user: user,
            character: JSON.stringify(CompressCharacter(character)),
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