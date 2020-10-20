import { writable } from 'svelte/store'
import GoTrue from 'gotrue-js'


const goTrueInstance = new GoTrue()
console.log(Object.keys(goTrueInstance))
goTrueInstance.api.apiURL = `https://apocalyptiaonline.com/.netlify/identity`
for (let i in goTrueInstance) console.log(goTrueInstance[i])

const goTrueUser = goTrueInstance.currentUser() || undefined

export const authUserStore = writable(goTrueUser)

export const userId = authUserStore.id


export const logout = () => {
	goTrueUser.logout().then(_ => authUserStore.update(_ => undefined))
}

export async function login(user) {
	try {
		await goTrueInstance.login(user.email, user.password, true)
			.then(_ => {
				authUserStore.update(_ => {
					return {
						email: goTrueUser.email,
						displayName: goTrueUser.displayName
					}
				})
				window.location.assign(`/`)
			})
	} catch (e) {
		throw e.message
	}
}

export const signup = () => {
	return goTrueInstance.signup(goTrueUser.email, goTrueUser.password)
}

export const recover = (email) => {
	return goTrueInstance.requestPasswordRecovery(email)
}

export const confirm = (token) => {
	return goTrueInstance.confirm(token)
}
