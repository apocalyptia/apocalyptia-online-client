import Abilities from '/src/rules/Abilities.js'
import filterList from '/src/classes/methods/abilities/filterList.js'
import resetList from '/src/classes/methods/abilities/resetList.js'
import sortList from '/src/classes/methods/abilities/sortList.js'
import toggleList from '/src/classes/methods/abilities/toggleList.js'

export default class AbilitiesStore {
	constructor() {
		// properties
		this.completeList = Object.values(Abilities)
		this.cost = 'all'
		this.display = 'Hide'
		this.sort = 'alpha'
		this.status = 'all'
		this.workingList = Object.values(Abilities)

		// methods
		this.filterList = filterList
		this.resetList = resetList
		this.sortList = sortList
		this.toggleList = toggleList
	}
}