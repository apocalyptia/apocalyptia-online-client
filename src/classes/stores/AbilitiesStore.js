import Abilities from '/src/rules/Abilities.js'
import close from '/src/classes/methods/abilities/close.js'
import filterList from '/src/classes/methods/abilities/filterList.js'
import reset from '/src/classes/methods/abilities/reset.js'
import sortList from '/src/classes/methods/abilities/sortList.js'

export default class AbilitiesStore {
	constructor() {
		this.displayList = Object.values(Abilities)
		this.xpCosts = new Set(Object.values(Abilities).map((a) => a.experience))
		this.visibleList = Object.values(Abilities)
		this.sort = 'alpha'
		this.cost = 0
		this.status = 'all'
		this.close = close
		this.filterList = filterList
		this.reset = reset
		this.sortList = sortList
	}
}