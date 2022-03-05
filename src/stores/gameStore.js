import GameStore from '$classes/store/GameStore.js'
import { writable } from 'svelte/store'

const gameStore = new GameStore()

export default writable(gameStore)
