import Player from 'classes/Player.js'
import { writable } from 'svelte/store'

export default writable(new Player())