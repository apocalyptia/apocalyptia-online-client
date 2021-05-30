import newCharacter from '/src/classes/methods/player/newCharacter.js'
import deleteCharacter from '/src/classes/methods/player/deleteCharacter.js'
import loadCharacter from '/src/classes/methods/player/loadCharacter.js'
import updateCharacter from '/src/classes/methods/player/updateCharacter.js'
import saveCharacter from '/src/classes/methods/player/saveCharacter.js'

export default class Player {
	constructor() {
		this.name = ''
		this.email = ''
		this.password = ''
		this.loggedIn = false
		this.characterIndex = -1
		this.characterList = []
		this.newCharacter = (character) => newCharacter(this, character)
		this.deleteCharacter = (characterName) => deleteCharacter(this, characterName)
		this.loadCharacter = (characterName) => loadCharacter(this, characterName)
		this.updateCharacter = () => updateCharacter(this)
		this.saveCharacter = (character) => saveCharacter(this, character)
	}
}
