import Character from 'classes/Character.js'
import { writable } from 'svelte/store'

export const character = writable(new Character())