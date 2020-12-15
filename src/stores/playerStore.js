import Player from 'classes/Player.js'
import { writable } from 'svelte/store'

export const player = writable(new Player())