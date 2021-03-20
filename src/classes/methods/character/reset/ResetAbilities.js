import AbilitiesList from '/src/rules/lists/abilities/AbilitiesList.js'

export default (c) => {
	for (let a of AbilitiesList.masterList) {
		a.qty = 0
	}
	c.updateAbilities(c)
	c.resetGear(c)
}