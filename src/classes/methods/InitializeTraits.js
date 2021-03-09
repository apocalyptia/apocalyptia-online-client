import TraitsList from 'rules/lists/TraitsList.js'

export default (c) => {
	c.traits = {}
	for (let trait of TraitsList.list) {
		c.traits[trait.name.toLowerCase()] = {
			name: trait.name,
			score: 1
		}
	}
	return c.traits
}