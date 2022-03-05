import initializePlayer from '$classes/methods/player/initializePlayer.js'
import deleteCharacter from '$classes/methods/player/deleteCharacter.js'
import loadCharacter from '$classes/methods/player/loadCharacter.js'
// import authenticateUser from '$classes/methods/player/authenticateUser.js'
import backupCharacter from '$classes/methods/player/backupCharacter.js'
import joinGame from '$classes/methods/player/joinGame.js'
import readCharacters from '$classes/methods/player/readCharacters.js'
import saveCharacter from '$classes/methods/player/saveCharacter.js'
import userLogin from '$classes/methods/player/userLogin.js'
import userLogout from '$classes/methods/player/userLogout.js'

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
		// this.authenticateUser = authenticateUser
		this.joinGame = joinGame
		this.userLogin = userLogin
		this.userLogout = userLogout
	}
}
