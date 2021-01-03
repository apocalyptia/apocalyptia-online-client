import Game from 'classes/Game.js'
import { writable } from 'svelte/store'

export const gameStore = writable(new Game())