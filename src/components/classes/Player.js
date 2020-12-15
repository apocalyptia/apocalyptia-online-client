import CreateCharacter from 'database/CreateCharacter.js'
import DeleteCharacter from 'database/DeleteCharacter.js'
import ReadAllCharacters from '../../database/ReadAllCharacters'
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
		this.characterList.push(character)
		this.currentCharacter = this.characterList.length - 1
		CreateCharacter(character)
		return this
	}
	deleteCharacter(character) {
		this.characterList = this.characterList.filter(c => c.description.name.value != character)
		if (this.characterList.length) this.currentCharacter = 0
		else this.currentCharacter = null
		DeleteCharacter(character)
		return this
	}
	loadCharacter(character) {
		this.characterList.push(character)
		this.currentCharacter = this.characterList.length - 1
		ReadCharacter(character)
		return this
	}
	loadAllCharacters() {
		this.characterList = ReadAllCharacters()
		return this
	}
	saveCharacter(character) {
		this.characterList.push(character)
		this.currentCharacter = this.characterList.length - 1
		UpdateCharacter(character)
		return this
	}
}