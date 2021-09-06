export default function() {
	const spentSkillPoints = Object.values(this.skills)
		.map((s) => s.score)
		.reduce((sum, s) => sum + s, 0)
	this.startingSkills = this.traits.brains.score * this.meta.startingSkillsMultiplier
	const remainingSkills = this.startingSkills - spentSkillPoints
	this.meta.skillsRemaining = remainingSkills
	return this
}