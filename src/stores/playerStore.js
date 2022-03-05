import PlayerStore from '$classes/stores/PlayerStore.js'
import { writable } from 'svelte/store'

const playerStore = new PlayerStore()

export default writable(playerStore)
