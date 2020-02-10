import * as sapper from '@sapper/app'
import GoTrue from "gotrue-js"
import { userFromNetlify } from "../components/helpers/User"
import { writable } from "svelte/store"

const url = "https://apocalyptiaonline.com/"
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
			console.log(authUserStore)
			authUserStore.update(() => undefined)
			sapper.goto('/')
		})
		.catch(e => {
			alert(e.message)
		})
}

export async function signin(email, password) {
	try {
		await goTrueInstance.login(email, password, true).then(user => {
			authUserStore.update(() => userFromNetlify(user))
			window.location.assign("/")
		})
	} catch (e) {
		alert(e.message)
		throw e.message
	}
}

export function register(email, password) {
	return goTrueInstance.signup(email, password)
}

export function requestPasswordRecovery(email) {
	return goTrueInstance.requestPasswordRecovery(email)
}

export function confirm(token) {
	goTrueInstance
		.confirm(token)
		.then(function(response) {
			alert(
				"Account confirmed! Welcome to the party! You can now login with your details",
				JSON.stringify({ response })
			)
		})
		.catch(function(e) {
			alert(e.message)
		})
}

// custom logic for registration

// var hash = window.location.hash.substr(1)
// var result = hash.split("&").reduce(function(acc, item) {
// 	var parts = item.split("=")
// 	acc[parts[0]] = parts[1]
// 	return acc
// }, {})
// if (result.confirmation_token) {
// 	confirm(result.confirmation_token)
// } else if (result.recovery_token) {
// 	console.log("recovering account")
// 	recover(result.recovery_token)
// }
