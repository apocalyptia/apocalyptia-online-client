import { writable } from 'svelte/store'
import GoTrue from 'gotrue-js'

export const go = GoTrue

export const logout = {}

export const userId = false

export const confirm = {}

export const signup = {}

export const recover = {}

// const goTrueInstance = {}

// console.log('---\n', goTrueInstance)

// goTrueInstance.api.apiURL = `https://apocalyptiaonline.com/.netlify/identity`

// for (let i in goTrueInstance) console.log('---goTrueInstance.>\n', goTrueInstance[i])

// const goTrueUser = goTrueInstance.currentUser() || undefined

// console.log('---\n', goTrueUser)

// export const authUserStore = writable(goTrueUser)

// console.log('---\n', authUserStore)

// export const userId = authUserStore.id


// export const logout = () => {
// 	goTrueUser.logout().then(_ => authUserStore.update(_ => undefined))
// }

// export async function login(user) {
// 	try {
// 		await goTrueInstance.login(user.email, user.password, true)
// 			.then(_ => {
// 				authUserStore.update(_ => {
// 					return {
// 						email: goTrueUser.email,
// 						displayName: goTrueUser.displayName
// 					}
// 				})
// 				window.location.assign(`/`)
// 			})
// 	} catch (e) {
// 		throw e.message
// 	}
// }

// export const signup = () => {
// 	return goTrueInstance.signup(goTrueUser.email, goTrueUser.password)
// }

// export const recover = (email) => {
// 	return goTrueInstance.requestPasswordRecovery(email)
// }

// export const confirm = (token) => {
// 	return goTrueInstance.confirm(token)
// }
