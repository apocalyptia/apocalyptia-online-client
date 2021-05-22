import Player from '/src/classes/Player.js'

export default () => {
	sessionStorage.setItem(`loggedIn`, `false`)
	return new Player()
}