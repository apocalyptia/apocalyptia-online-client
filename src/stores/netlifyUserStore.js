import * as sapper from '@sapper/app'
import GoTrue from "gotrue-js"
import { userFromNetlify } from "../components/helpers/User"
import { writable } from "svelte/store"

const url = `https://apocalyptiaonline.com/`

const goTrueInstance = new GoTrue({
	APIUrl: `${url}/.netlify/identity`,
	setCookie: true
})

const goTrueUser = goTrueInstance.currentUser() || undefined

export const authUserStore = writable(goTrueUser)

export function logout() {
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
		await goTrueInstance.login(email, password, true).then(user => {
			authUserStore.update(() => userFromNetlify(user))
			window.location.assign(`/`)
		})
	} catch (e) {
		alert(e.message)
		throw e.message
	}
}

export function signup(email, password) {
	return goTrueInstance.signup(email, password)
}

export function recover(email) {
	return goTrueInstance.requestPasswordRecovery(email)
}

export function confirm(token) {
	goTrueInstance
		.confirm(token)
		.then(function(response) {
			alert(
				`Account confirmed. Welcome to Apocalyptia Online. You can now login with your username and password.`,
				JSON.stringify({ response })
			)
		})
		.catch(function(e) {
			alert(e.message)
		})
}