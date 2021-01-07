export default (playerStore, email, password) => {
	if (email && password) {
		playerStore.loggedIn = true
	}
	else {
		alert('Error: Incorrect email and/or password.')
	}
	return playerStore
}