import CharacterStore from '/src/classes/stores/CharacterStore.js'
import { writable } from 'svelte/store'

const characterStore = new CharacterStore()

export default writable(characterStore)
