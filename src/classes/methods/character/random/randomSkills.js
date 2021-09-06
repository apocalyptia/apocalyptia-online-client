import randomRoll from '/src/utils/random/dice/randomRoll.js'

export default function() {
	this.resetSkills()
	while (this.meta.skillsRemaining) {
		const skillName = randomRoll(Object.keys(this.skills))
		const parentKey = this.skills[skillName].parent.toLowerCase()
		const parentScore = this.traits[parentKey].score
		if (this.skills[skillName].score < parentScore) {
			this.skills[skillName].score++
		}
		this.remainingSkills()
	}
	for (const skill of Object.values(this.skills)) {
		this.updateSkill(skill)
	}
	return this
}