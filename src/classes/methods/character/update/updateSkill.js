export default function(skill) {
	const skillKey = skill.name.toLowerCase()
	const parentKey = this.skills[skillKey].parent.toLowerCase()
	this.skills[skillKey].score = parseInt(skill.score)
	this.remainingSkills()
	while (
		this.meta.skillsRemaining < 0 ||
		this.skills[skillKey].score > this.traits[parentKey].score
	) {
		this.skills[skillKey].score--
		this.remainingSkills()
	}
	return this
}