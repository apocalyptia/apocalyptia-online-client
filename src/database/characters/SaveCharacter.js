import CompressCharacter from 'database/characters/CompressCharacter.js'

export default (c) => {
	window.localStorage.setItem(c.description.name.value, CompressCharacter(c))
}