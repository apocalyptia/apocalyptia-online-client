import Game from '/src/classes/Game.js'
import { writable } from 'svelte/store'

export default writable(new Game())
