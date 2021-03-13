import Player from 'classes/Player.js'

export default _ => {
	sessionStorage.setItem(`loggedIn`, `false`)
	return new Player()
}