import Character from "../../rules/Character"


const deleteLocal = () => {
    window.localStorage.removeItem(`character`)
}

export default (user, character) => {
    deleteLocal()
    // fetch(`/.netlify/functions/character-delete`, {
	// 	body: JSON.stringify(CompressCharacter(character)),
	// 	method: `POST`
	// }).then(res => console.log(res))
    return new Character()
}