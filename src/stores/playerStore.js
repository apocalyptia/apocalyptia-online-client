import Player from 'classes/Player.js'
import { writable } from 'svelte/store'

export const playerStore = writable(new Player())