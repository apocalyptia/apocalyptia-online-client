import { writable } from 'svelte/store'
import GoTrue from 'gotrue-js'

const url = `https://apocalyptiaonline.com/`

const goTrueInstance = new GoTrue({
	APIUrl: `${url}/.netlify/identity`,
	setCookie: true
})

const goTrueUser = goTrueInstance.currentUser() || undefined

const getUser = (user) => {
	return {
		email: user.email,
		displayName: user.displayName
	}
}

export const authUserStore = writable(goTrueUser)

export const logout = () => {
	goTrueUser
		.logout()
		.then(() => {
			authUserStore.update(() => undefined)
		})
		.catch(e => {
			alert(e.message)
		})
}

export async function login(email, password) {
	try {
		await goTrueInstance
				.login(email, password, true)
				.then(user => {
					authUserStore.update(() => getUser(user))
					window.location.assign(`/`)
				})
	} catch (e) {
		alert(e.message)
		throw e.message
	}
}

export const signup = (email, password) => {
	return goTrueInstance.signup(email, password)
}

export const recover = (email) => {
	return goTrueInstance.requestPasswordRecovery(email)
}

export const confirm = (token) => {
	goTrueInstance
		.confirm(token)
		.then(function(response) {
			alert(
				`Account confirmed. Welcome to Apocalyptia Online. You can now login with your username and password.`,
				JSON.stringify({ response })
			)
		})
		.catch((e) => {
			alert(e.message)
		})
}