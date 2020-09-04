import CompressCharacter from './CompressCharacter'
import DecompressCharacter from './DecompressCharacter'


export default (user, character) => {
    fetch(`/.netlify/functions/character-read`, {
		body: {
            user: user,
            character: JSON.stringify(CompressCharacter(character))
        },
		method: `POST`
    })
        .then(res => {
            console.log('SUCCESS!')
            console.log(res)
            character = DecompressCharacter(res.body.character)
        })
        .catch(err => {
            console.log('ERROR!')
            console.log(err)
        })
    return character
}