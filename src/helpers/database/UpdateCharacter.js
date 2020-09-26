import CompressCharacter from './CompressCharacter'

export default (character) => {
    return fetch(
        `/.netlify/functions/character-update`,
        {
            method: `POST`,
            body: JSON.stringify(CompressCharacter(character))
        }
	).then(res => res.json())
}