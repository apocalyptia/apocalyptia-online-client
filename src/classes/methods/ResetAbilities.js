import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'

export default (c) => {
	for (let a of AbilitiesList.masterList) {
		a.taken = 0
	}
	return c.updateAbilities()
}