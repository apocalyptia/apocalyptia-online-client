import Abilities from '/src/rules/Abilities.js'

export default function() {
	Object.values(Abilities).forEach(ability => {
		ability.quantity = 0
		ability.selectedOption = 0
	})
	this.displayList = Object.values(Abilities)
	this.xpCosts = new Set(Object.values(Abilities).map((a) => a.experience))
	this.visibleList = Object.values(Abilities)
	this.sort = 'alpha'
	this.cost = 0
	this.status = 'all'
	return this
}
