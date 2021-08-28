import CreationStore from '/src/classes/stores/CreationStore.js'
import { writable } from 'svelte/store'

const creationStore = new CreationStore()

export default writable(creationStore)
