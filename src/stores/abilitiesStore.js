import Abilities from '/src/rules/Abilities.js'
import { writable } from 'svelte/store'

const abilityList = Object.values(Abilities)

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