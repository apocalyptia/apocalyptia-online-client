import Game from '/src/classes/Game.js'
import { writable } from 'svelte/store'

const newGame = new Game()

export default writable(newGame)
