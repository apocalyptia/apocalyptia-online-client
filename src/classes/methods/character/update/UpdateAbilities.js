import AbilitiesList from '/src/rules/lists/abilities/AbilitiesList.js'

export default (c) => {
	c.abilities = [...AbilitiesList.masterList.filter(a => a.qty)]
	c.properties.experience.current = c.abilities.reduce((sum, a) => {
		return sum - (a.qty * a.experience)
	}, c.properties.experience.score)
	for (let a in c.abilities) {
		if (a.formula != null) a.formula(c)
	}
}