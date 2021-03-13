import NewCharacter from 'classes/methods/player/NewCharacter.js'
import DeleteCharacter from 'classes/methods/player/DeleteCharacter.js'
import LoadCharacter from 'classes/methods/player/LoadCharacter.js'
import UpdateCharacter from 'classes/methods/player/UpdateCharacter.js'
import SaveCharacter from 'classes/methods/player/SaveCharacter.js'

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
		this.updateCharacter = _ => UpdateCharacter(this)
		this.saveCharacter = (character) => SaveCharacter(this, character)
	}
}