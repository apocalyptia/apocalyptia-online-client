import Character from '/src/classes/Character.js'
import { GoTrue } from 'gotrue-js'
import characterStore from '/src/stores/characterStore.js'
import compressCharacter from '/src/utils/database/characters/compressCharacter.js'
import decompressCharacter from '/src/utils/database/characters/decompressCharacter.js'
import { get } from 'svelte/store'

export default class Player {
	constructor() {
		this.id = ``
		this.name = ``
		this.email = ``
		this.password = ``
		this.list = []
		this.loggedIn = false
		this.selected = null

		this.default = () => {
			this.read()
			this.selected = this.list[0] || null
		}
		this.delete = (character) => {
			if (character.meta.id === get(characterStore).meta.id) {
				characterStore.set(new Character())
			}
			window.localStorage.removeItem(character.meta.id)
			this.read()
		}
		this.load = ({ id, character }) => {
			if (id || character) {
				return decompressCharacter(window.localStorage.getItem(id || character.meta.id))
			}
			else {
				return null
			}
		}
		this.save = (character) => {
			this.selected = character
			window.localStorage.setItem(character.meta.id, compressCharacter(character))
			this.read()
		}
		this.read = () => {
			this.list = Object.keys(window.localStorage).map((key) => this.load({ id: key }))
		}
		this.backup = () => {
			if (this.selected) {
				const blob = new Blob(
					[ compressCharacter(this.selected) ],
					{ type: `text/plain` }
				)
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement(`a`)
				a.href = url
				a.download = this.selected.description.name.value
				a.click()
				window.URL.revokeObjectURL(url)
			}
		}

		this.auth = new GoTrue({
			APIUrl: 'https://www.apocalyptia.com/.netlify/identity',
			setCookie: true
		})

		this.join = (email, password, confirm) => {
			console.log('join')
			if (email && password && password === confirm) {
				this.email = email
				this.password = password
				this.loggedIn = true
			} 
			else {
				alert('Error: Invalid registration information.')
			}
		}
		this.login = async (email, password) => {
			console.log('login')
			if (email && password) {
				await this.auth.login(email, password, true).then((res) => {
					console.log('+ + + + ', res)
					$playerStore.loggedIn = true
					// goto('/')
				}).catch((err) => {
					console.log('> > > > ', err)
				})
				this.email = email
				this.loggedIn = true
			}
			else {
				alert('Error: Invalid login information.')
			}
		}
		this.logout = () => {
			console.log('logout')
			this.loggedIn = false
		}
	}
}
