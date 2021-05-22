import Player from '/src/classes/Player.js'
import { writable } from 'svelte/store'

const newPlayer = new Player()

export default writable(newPlayer)