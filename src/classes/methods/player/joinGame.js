export default function (email, password, confirm) {
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