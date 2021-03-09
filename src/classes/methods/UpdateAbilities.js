import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'

export default (c) => {
	c.abilities = [...AbilitiesList.masterList.filter(a => a.taken)]
	c.properties.experience.current = c.abilities.reduce((sum, a) => {
		return sum - (a.taken * a.experience)
	}, c.properties.experience.score)
	return c.resetGear()
}