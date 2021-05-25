import NewCharacter from '/src/classes/methods/player/NewCharacter.js'
import DeleteCharacter from '/src/classes/methods/player/DeleteCharacter.js'
import LoadCharacter from '/src/classes/methods/player/LoadCharacter.js'
import UpdateCharacter from '/src/classes/methods/player/UpdateCharacter.js'
import SaveCharacter from '/src/classes/methods/player/SaveCharacter.js'

export default class Player {
	constructor() {
		this.name = ''
		this.email = ''
		this.password = ''
		this.loggedIn = false
		this.characterIndex = -1
		this.characterList = []
		this.newCharacter = (character) => NewCharacter(this, character)
		this.deleteCharacter = (characterName) => DeleteCharacter(this, characterName)
		this.loadCharacter = (characterName) => LoadCharacter(this, characterName)
		this.updateCharacter = () => UpdateCharacter(this)
		this.saveCharacter = (character) => SaveCharacter(this, character)
	}
}