import Character from '$classes/Character.js'
import { writable } from 'svelte/store'

export default writable(new Character())