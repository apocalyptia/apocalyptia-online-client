import CompressCharacter from 'database/CompressCharacter.js'

export default (character) => {
    return fetch(
        `/.netlify/functions/character-update`,
        {
            method: `POST`,
            body: JSON.stringify(CompressCharacter(character))
        }
	).then(res => res.json())
}