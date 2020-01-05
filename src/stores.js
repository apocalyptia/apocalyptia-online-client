import { writable } from 'svelte/store'
import { Character } from './components/rules/Character'

const newCharacter = new Character()

export const character = writable(newCharacter)