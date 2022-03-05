import AbilitiesStore from '$classes/stores/AbilitiesStore.js'
import { writable } from 'svelte/store'

const abilitiesStore = new AbilitiesStore()

export default writable(abilitiesStore)
