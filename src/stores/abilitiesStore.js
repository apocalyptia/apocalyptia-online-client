import Abilities from '/src/rules/Abilities.js'
import { writable } from 'svelte/store'

const abilityList = Object.values(Abilities)

const xpCosts = abilityList.map((a) => a.experience)

const xpCostLevels = []

for (let i = 0; i <= Math.max(...xpCosts); i += Math.min(...xpCosts)) {
	if (abilityList.some((a) => a.experience === i)) {
		xpCostLevels.push(i)
	}
}

class AbilitiesStore {
	constructor() {
		this.displayList = [...abilityList]
		this.xpCosts = [...xpCostLevels]
		this.visibleList = [...abilityList]
		this.sort = 'alpha'
		this.cost = 0
		this.status = 'all'
	}

	close() {
		this.displayList.forEach((a) => {
			const ability = document.getElementById(`details-${a.name.replace(' ', '')}`)
			if (ability && ability.hasAttribute('open')) {
				ability.removeAttribute('open')
			}
		})
	}

	sortList() {
		this.close()
		switch (this.order) {
			case 'alpha':
				this.visibleList.sort((a, b) => a.name.localeCompare(b.name))
				break
			case 'zeta':
				this.visibleList.sort((a, b) => b.name.localeCompare(a.name))
				break
			case 'xphigh':
				this.visibleList.sort((a, b) => a.experience - b.experience)
				break
			case 'xplow':
				this.visibleList.sort((a, b) => b.experience - a.experience)
				break
		}
	}

	filterList() {
		this.close()
		if (this.cost) {
			this.visibleList = this.displayList.filter((a) => a.experience === this.cost)
		} else {
			this.visibleList = [...this.displayList]
		}
		if (this.status === 'yes') {
			this.visibleList = this.visibleList.filter((a) => a.quantity > 0)
		} else if (this.status === 'no') {
			this.visibleList = this.visibleList.filter((a) => a.quantity === 0)
		}
		this.sortList()
	}

	reset() {
		this.displayList = [...abilityList]
		this.xpCosts = [...xpCostLevels]
		this.visibleList = [...abilityList]
		this.sort = 'alpha'
		this.cost = 0
		this.status = 'all'
	}
}

const abilitiesStore = new AbilitiesStore()

export default writable(abilitiesStore)
