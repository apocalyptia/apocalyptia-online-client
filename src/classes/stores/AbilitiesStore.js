import Abilities from '$rules/Abilities.js'
import filterList from '$classes/methods/abilities/filterList.js'
import resetList from '$classes/methods/abilities/resetList.js'
import sortList from '$classes/methods/abilities/sortList.js'
import toggleList from '$classes/methods/abilities/toggleList.js'

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