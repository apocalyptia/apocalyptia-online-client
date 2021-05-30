export default (playerStore, email, password, confirm) => {
	if (email && password && password === confirm) {
		playerStore.email = email
		playerStore.password = password
		if (window.localStorage.getItem(email) === null) {
			window.localStorage.setItem(email, JSON.stringify(playerStore))
		} else {
			playerStore = JSON.parse(window.localStorage.getItem(email))
		}
		playerStore.loggedIn = true
		console.log(`Joined as ${email}!`)
		console.log(playerStore)
	} else alert('Error: Invalid login information.')
	return playerStore
}
