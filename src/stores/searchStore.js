import SearchStore from '$classes/stores/SearchStore.js'
import { writable } from 'svelte/store'


const searchStore = new SearchStore()

export default writable(searchStore)
