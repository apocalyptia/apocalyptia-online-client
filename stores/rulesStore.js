import { writable } from 'svelte/store'

class RulesStore {
	constructor() {
		this.loading = true
		this.creation = {}
		this.list = {}
	}
}

const newRulesStore = new RulesStore()

export default writable(newRulesStore)