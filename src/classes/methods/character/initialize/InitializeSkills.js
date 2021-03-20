import SkillsList from '/src/rules/lists/SkillsList.js'

export default (c) => {
	c.skills = {}
	for (let skill of SkillsList.list) {
		c.skills[skill.name.toLowerCase()] = {
			name: skill.name,
			parent: skill.parent,
			score: 0,
			specs: {}
		}
		for (let spec in skill.specs) {
			c.skills[skill.name.toLowerCase()].specs[spec] = {
				name: spec.name,
				score: 0
			}
		}
	}
	return c.skills
}