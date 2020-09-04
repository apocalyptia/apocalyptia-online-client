import CompressCharacter from './CompressCharacter'
import DecompressCharacter from './DecompressCharacter'


export default (user, character) => {
    fetch(`/.netlify/functions/character-read`, {
		body: {
            user: user,
            character: JSON.stringify(CompressCharacter(character))
        },
		method: `POST`
    }).then(res => DecompressCharacter(res.body.character))
}