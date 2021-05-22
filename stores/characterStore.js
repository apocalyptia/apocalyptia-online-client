import Character from '/src/classes/Character.js'
import rulesStore from '/src/stores/rulesStore.js'
import { get, writable } from 'svelte/store'

const rules = get(rulesStore)

const character = new Character(rules)

export default writable(character)