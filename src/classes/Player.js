// import CreateCharacter from 'database/characters/CreateCharacter.js'
import DeleteCharacter from 'database/characters/DeleteCharacter.js'
import ReadAllCharacters from 'database/characters/ReadAllCharacters.js'
import ReadCharacter from 'database/characters/ReadCharacter.js'
import UpdateCharacter from 'database/characters/UpdateCharacter.js'

export default class Player {
	constructor() {
		this.name = ''
		this.email = ''
		this.password = ''
		this.loggedIn = false
		this.currentCharacter = false
		this.currentCharacterIndex = -1
		this.characterList = []
	}
	newCharacter(character) {
		// CreateCharacter(character)
		this.characterList.push(character)
		this.currentCharacterIndex = this.characterList.length - 1
		return this
	}
	deleteCharacter() {
		DeleteCharacter(this.characterList[this.currentCharacterIndex])
		this.characterList = this.characterList.filter(c => c.description.name.value != characterName)
		if (this.characterList.length) this.currentCharacterIndex = 0
		else this.currentCharacterIndex = null
		return this
	}
	loadCharacter(characterName) {
		this.characterList.push(ReadCharacter(characterName))
		this.currentCharacterIndex = this.characterList.length - 1
		return this
	}
	loadAllCharacters() {
		this.characterList = ReadAllCharacters()
		return this
	}
	updateCharacter(character) {
		this.characterList.push(character)
		this.currentCharacterIndex = this.characterList.length - 1
		UpdateCharacter(character)
		return this
	}
}