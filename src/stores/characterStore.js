import Character from 'classes/Character.js'
import { writable } from 'svelte/store'

const character = new Character()

export default writable(character)