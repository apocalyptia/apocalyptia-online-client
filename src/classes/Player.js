import compressCharacter from '/src/utils/database/characters/compressCharacter.js'
import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'


export default class Player {
	constructor() {
		this.id = ``
		this.name = ``
		this.email = ``
		this.password = ``
		this.loggedIn = false
		this.currentCharacter = null
		this.characterList = []

		this.defaultCharacter = () => {
			const firstKey = window.localStorage.key(0)
			const firstCharacter = window.localStorage.getItem(firstKey)
			if (firstCharacter !== null) {
				this.currentCharacter = decompressCharacter(firstCharacter)
			}
		}
		this.deleteCharacter = (character) => {
			if (this.characterList.length) {
				window.localStorage.removeItem(character.meta.id)
				this.characterList = this.characterList.filter((c) => c.meta.id !== character.meta.id)
			}
			if (this.currentCharacter.meta.id === character.meta.id) {
				if (this.characterList.length) {
					this.currentCharacter = this.characterList[this.characterList.length - 1]
				}
				else {
					this.currentCharacter = null
				}
			}
		}
		this.loadCharacter = (characterId) => {
			const loadedCharacter = window.localStorage.getItem(characterId)
			if (loadedCharacter !== null) {
				this.currentCharacter = decompressCharacter(loadedCharacter)
				this.characterList.push(this.currentCharacter)
			}
		}
		this.newCharacter = (character) => {
			window.localStorage.setItem(character.meta.id, compressCharacter(character))
			this.currentCharacter = this.loadCharacter(character.meta.id)
			this.characterList.push(this.currentCharacter)
		}
		this.readCharacters = () => {
			if (window.localStorage.length) {
				this.characterList = Object.keys(window.localStorage).map((c) => decompressCharacter(window.localStorage.getItem(c)))
			}
		}
		this.saveCharacter = (character) => {
			const characterIndex = this.characterList.findIndex((c) => c.meta.id === character.meta.id)
			if (characterIndex >= 0) {
				this.characterList[characterIndex] = character
				window.localStorage.setItem(character.meta.id, compressCharacter(character))
			}
			else {
				this.newCharacter(character)
			}
		}
		this.backupCharacter = (character) => {
			const characterBlob = new Blob([compressCharacter(character)], { type: `text/plain` })
			const url = window.URL.createObjectURL(characterBlob)
			const a = document.createElement(`a`)
			a.href = url
			a.download = character.description.name.value
			a.click()
			window.URL.revokeObjectURL(url)
		}
	}
}
