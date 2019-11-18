import { writable } from 'svelte/store';
import Character from './BlankCharacter.js'

const NewCharacter = new Character()

export const CharacterStore = writable(NewCharacter)