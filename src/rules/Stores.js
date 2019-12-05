import { writable } from 'svelte/store'
import { Character } from './character/Character'

let newCharacter = new Character()

export const CharacterStore = writable(newCharacter)