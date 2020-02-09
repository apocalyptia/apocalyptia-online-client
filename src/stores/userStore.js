import { writable } from 'svelte/store'
import GoTrue from 'gotrue-js'

export const PENDING_VERIFICATION = 'PENDING_VERIFICATION'

const url = 'https://apocalyptiaonline.com'

const goTrueInstance = new GoTrue({
	APIUrl: `${url}/.netlify/identity`,
	setCookie: true
})

const user = goTrueInstance.currentUser() || undefined

export const authUserStore = writable(user)

export function logout() {
	user.logout().then(() => authUserStore.update(undefined))
}

export function signin(email, password) {
	goTrueInstance.login(email, password, true).then(user => authUserStore.update(user))
}

export function register(email, password) {
	goTrueInstance.signup(email, password).then(() => authUserStore.update(PENDING_VERIFICATION)).catch(e => alert(e.message))
}

export function confirm(token) {
	goTrueInstance.confirm(token).then(res => alert('Account confirmed!', JSON.stringify({res}))).catch(e => alert(e.message))
}