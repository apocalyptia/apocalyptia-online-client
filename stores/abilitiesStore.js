import rulesStore from '/src/stores/rulesStore.js'
import { get, writable } from 'svelte/store'

const rules = get(rulesStore)

const abilityList = Object.values(rules.list.abilities)

const xpCosts = abilityList.map(a => a.experience)

const minXPCost = Math.min(...xpCosts)

const maxXPCost = Math.max(...xpCosts)

const xpCostLevels = []

for (let i = 0; i <= maxXPCost; i += minXPCost) {
	if (abilityList.some(a => a.experience === i)) {
		xpCostLevels.push(i)
	}
}

class AbilitiesStore {
	constructor() {
		this.list = [ ...abilityList ],
		this.xpCosts = [ ...xpCostLevels ]
	}
}

const abilitiesStore = new AbilitiesStore()

export default writable(abilitiesStore)