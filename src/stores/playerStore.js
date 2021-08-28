import PlayerStore from '/src/classes/stores/PlayerStore.js'
import { writable } from 'svelte/store'

const playerStore = new PlayerStore()

export default writable(playerStore)
