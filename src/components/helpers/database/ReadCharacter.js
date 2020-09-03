import CompressCharacter from './CompressCharacter'
import DecompressCharacter from './DecompressCharacter'


export default (user, c) => {
    fetch(`/.netlify/functions/character-read`, {
		body: {
            user: user,
            character: JSON.stringify(CompressCharacter(c))
        },
		method: `POST`
    })
        .then(res => {
            console.log('SUCCESS!')
            console.log(res)
            c = DecompressCharacter(res.body.character)
        })
        .catch(err => {
            console.log('ERROR!')
            console.log(err)
        })
    return c
}