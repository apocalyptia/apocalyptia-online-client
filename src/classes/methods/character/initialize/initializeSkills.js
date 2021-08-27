import Skills from '/src/rules/Skills.js'

export default () => {
	const skills = {}
	for (const skill of Object.values(Skills)) {
		const skillKey = skill.name.toLowerCase()
		skills[skillKey] = {
			name: skill.name,
			parent: skill.parent,
			score: 0,
			specialties: skill.specialties,
		}
	}
	return skills
}
