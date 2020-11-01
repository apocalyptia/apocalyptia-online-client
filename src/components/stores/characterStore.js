import Character from 'classes/Character.js'
import { writable } from 'svelte/store'

const newCharacter = new Character()

export const character = writable(newCharacter)