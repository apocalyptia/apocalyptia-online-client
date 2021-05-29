import Character from '/src/classes/Character.js'
import { writable } from 'svelte/store'

const newCharacter = new Character()

export default writable(newCharacter)