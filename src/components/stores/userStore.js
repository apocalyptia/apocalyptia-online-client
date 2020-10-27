// import { writable } from 'svelte/store'
// import GoTrue from 'gotrue-js'

// const auth = new GoTrue.default({
//     APIUrl: `https://apocalyptiaonline.com/.netlify/identity`,
//     setCookie: true
// })

// export const userStore = writable(auth.currentUser())

// export const signup = _ => auth.signup(auth.email, auth.password)

// export const logout = _ => auth.logout()
//                                 .then(_ => userStore.update(_ => undefined))

// export const login = async (user) => {
// 	try {
// 		await auth.login(user.email, user.password, true)
// 			.then(res => {
// 				userStore.update(_ => {
// 					return {
// 						email: res.email,
// 						id: res.id
//                     }
//                 })
// 				window.location.assign(`/`)
// 			})
// 	} catch (err) {
// 		throw err.message
// 	}
// }

// export const recover = (email) => auth.requestPasswordRecovery(email)

// export const confirm = (token) => auth.confirm(token)