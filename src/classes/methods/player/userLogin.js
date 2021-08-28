export default async function(email, password) {
	console.log('login')
	if (email && password) {
		await this.auth.login(email, password, true).then((res) => {
			console.log('+ + + + ', res)
			this.loggedIn = true
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