import { writable } from 'svelte/store'
import { Character } from './Character'

const newCharacter = new Character()

export const character = writable(newCharacter)