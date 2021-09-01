import initializePlayer from '/src/classes/methods/player/initializePlayer.js'
import deleteCharacter from '/src/classes/methods/player/deleteCharacter.js'
import loadCharacter from '/src/classes/methods/player/loadCharacter.js'
import authenticateUser from '/src/classes/methods/player/authenticateUser.js'
import backupCharacter from '/src/classes/methods/player/backupCharacter.js'
import joinGame from '/src/classes/methods/player/joinGame.js'
import readCharacters from '/src/classes/methods/player/readCharacters.js'
import saveCharacter from '/src/classes/methods/player/saveCharacter.js'
import userLogin from '/src/classes/methods/player/userLogin.js'
import userLogout from '/src/classes/methods/player/userLogout.js'

export default class Player {
	constructor() {
		this.id = ``
		this.name = ``
		this.email = ``
		this.password = ``
		this.list = []
		this.loggedIn = false
		this.selected = null
		this.initializePlayer = initializePlayer
		this.deleteCharacter = deleteCharacter
		this.loadCharacter = loadCharacter
		this.saveCharacter = saveCharacter		
		this.readCharacters = readCharacters 
		this.backupCharacter = backupCharacter
		this.authenticateUser = authenticateUser
		this.joinGame = joinGame
		this.userLogin = userLogin
		this.userLogout = userLogout
	}
}
