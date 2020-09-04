import CompressCharacter from './CompressCharacter'


const createLocal = (character) => {
    window.localStorage.setItem(`character`, character)
}

export default (user, character) => {
    createLocal(character)
    fetch(`/.netlify/functions/character-create`, {
		body: {
            user: user,
            character: JSON.stringify(CompressCharacter(character))
        },
		method: `POST`
    }).then(res => res.json())
}