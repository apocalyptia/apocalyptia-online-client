import CreateCharacter from 'database/CreateCharacter.js'
import DeleteCharacter from 'database/DeleteCharacter.js'
import ReadAllCharacters from 'database/ReadAllCharacters.js'
import ReadCharacter from 'database/ReadCharacter.js'
import UpdateCharacter from 'database/UpdateCharacter.js'

export default class Player {
	constructor() {
		this.name = ''
		this.email = ''
		this.currentCharacter = null
		this.characterList = []
	}
	newCharacter(character) {
		CreateCharacter(character)
		this.characterList.push(character)
		this.currentCharacter = this.characterList.length - 1
		return this
	}
	deleteCharacter(characterName) {
		DeleteCharacter(characterName)
		this.characterList = this.characterList.filter(c => c.description.name.value != characterName)
		if (this.characterList.length) this.currentCharacter = 0
		else this.currentCharacter = null
		return this
	}
	loadCharacter(characterName) {
		this.characterList.push(ReadCharacter(characterName))
		this.currentCharacter = this.characterList.length - 1
		return this
	}
	loadAllCharacters() {
		this.characterList = ReadAllCharacters()
		return this
	}
	updateCharacter(character) {
		this.characterList.push(character)
		this.currentCharacter = this.characterList.length - 1
		UpdateCharacter(character)
		return this
	}
}