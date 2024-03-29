import PlayerStore from '$classes/stores/PlayerStore.js'
import { derived, writable } from 'svelte/store'

const playerStore = new PlayerStore()

export default writable(playerStore)

// export const isAuthenticated = writable(false)

// export const user = writable({})

// export const popupOpen = writable(false)

// export const error = writable()

// export const tasks = writable([])

// export const user_tasks = derived([tasks, user], ([$tasks, $user]) => {

// 	let logged_in_user_tasks = []

// 	if ($user && $user.email) {
// 		logged_in_user_tasks = $tasks.filter((task) => task.user === $user.email)
// 	}

// 	return logged_in_user_tasks

// })