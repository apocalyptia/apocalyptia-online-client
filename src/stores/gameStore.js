import Game from '$classes/Game.js'
import { writable } from 'svelte/store'

export default writable(new Game())