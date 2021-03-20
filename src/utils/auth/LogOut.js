import Player from '/src/classes/Player.js'

export default _ => {
	sessionStorage.setItem(`loggedIn`, `false`)
	return new Player()
}