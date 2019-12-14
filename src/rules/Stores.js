import { writable } from 'svelte/store'
import { Character } from './Character'

let newCharacter = new Character()

export const CharacterStore = writable(newCharacter)