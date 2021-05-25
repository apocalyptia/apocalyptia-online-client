export default (rules) => {
	const skills = {}
	for (const skill of Object.values(rules.list.skills)) {
		const skillKey = skill.name.toLowerCase()
		skills[skillKey] = {
			name: skill.name,
			parent: skill.parent,
			score: 0,
			specs: skill.specs
		}
	}
	return skills
}