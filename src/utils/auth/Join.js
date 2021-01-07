export default (playerStore, email, password, confirm) => {
	if (email && (password == confirm)) {
		playerStore.email = email
		playerStore.password = password
		playerStore.loggedIn = true
	}
	else {
		alert('Error: Passwords do not match.')
	}
	return playerStore
}