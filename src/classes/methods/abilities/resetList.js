import Abilities from '/src/rules/Abilities.js'

export default function() {
	Object.values(Abilities).forEach(ability => {
		ability.quantity = 0
		ability.selectedOption = 0
	})
	this.completeList = Object.values(Abilities)
	this.cost = 'all'
	this.display = 'Hide'
	this.sort = 'alpha'
	this.status = 'all'
	this.workingList = Object.values(Abilities)
	return this
}
