import AbilitiesList from '$rules/lists/abilities/AbilitiesList.js'
import PropertiesList from '$rules/lists/PropertiesList.js'

export default {
	name: `Creation`,
	resetDescription(c) {
		for (let d in c.description) c.description[d].value = ``
		return c
	},
	resetTraits(c) {
		for (let t in c.traits) c.traits[t].score = 1
		return c
	},
	resetSkills(c) {
		for (let s in c.skills) c.skills[s].score = 0
		return c
	},
	setProperties(c) {
		for (let p of PropertiesList.list) p.formula(c)
		return c
	},
	updateAbilities(c) {
		c.abilities = [...AbilitiesList.masterList.filter(a => a.taken)]
		c.properties.xp.current = c.properties.xp.score
		if (c.abilities.length) {
			c.abilities.forEach(a => c.properties.xp.current -= (a.taken * a.xp))
		}
		return c
	},
	resetAbilities(c) {
		AbilitiesList.masterList.forEach(a => a.taken = 0)
		return this.updateAbilities(c)
	},
	resetGear(c) {
		for (let g in c.gear) c.gear[g].inventory = []
		return c
	},
	applyAbilities(c) {
		for (let a in c.abilities) c.abilities[a].formula(c)
	},
	finalize(userId) {
		if (!c.created) c.created = new Date(c)
		c.meta.user = userId
		c.meta.step = 6
		c.meta.modified = new Date(c)
		return c
	}
}