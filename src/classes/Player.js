import compressCharacter from '/src/utils/database/characters/compressCharacter.js'
import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'


export default class Player {
	constructor() {
		this.id = ``
		this.name = ``
		this.email = ``
		this.password = ``
		this.loggedIn = false
		this.selectedCharacter = null

		this.defaultCharacter = () => {
			const firstKey = window.localStorage.key(0)
			const firstCharacter = window.localStorage.getItem(firstKey)
			if (firstCharacter) {
				const decompressedCharacter = decompressCharacter(firstCharacter)
				this.selectedCharacter = decompressedCharacter
				return decompressedCharacter
			}
		}
		this.deleteCharacter = (character) => {
			window.localStorage.removeItem(character.meta.id)
		}
		this.loadCharacter = (characterId) => {
			const character = window.localStorage.getItem(characterId)
			if (character) {
				const decompressedCharacter = decompressCharacter(character)
				return decompressedCharacter
			}
			else {
				return null
			}
		}
		this.saveCharacter = (character) => {
			this.selectedCharacter = character
			window.localStorage.setItem(character.meta.id, compressCharacter(character))
		}
		this.readCharacters = () => {
			const characterKeys = Object.keys(window.localStorage)
			const list = []
			let l = ''
			characterKeys.forEach(k => {
				console.log('key = ', k)
				l = this.loadCharacter(k)
				console.log('loaded character = ', l.description.name.value)
				list.push(this.loadCharacter(k))
				console.log('character in list = ', list[list.length - 1].description.name.value)
				console.log('list.length = ', list.length)
				console.log('-----------------------------')
			})
			list.forEach(c => console.log('character name in completed list = ', c.description.name.value))
			return list
		}
		this.backupCharacter = (character = null) => {
			if (character === null) {
				character = this.selectedCharacter
			}
			if (character) {
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
}
