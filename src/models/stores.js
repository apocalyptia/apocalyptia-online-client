import { writable } from 'svelte/store'
import { Character } from './character/character'

let newCharacter = new Character()

export const CharacterStore = writable(newCharacter)