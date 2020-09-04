import Character from '../../rules/Character'
import CompressCharacter from './CompressCharacter'


const deleteLocal = () => {
    window.localStorage.removeItem(`character`)
}

export default (user, character) => {
    deleteLocal()
    fetch(`/.netlify/functions/character-delete`, {
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
    return new Character()
}