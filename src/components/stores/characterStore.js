import Character from 'rules/Character.js'
import { writable } from 'svelte/store'

const newCharacter = new Character()

export const character = writable(newCharacter)