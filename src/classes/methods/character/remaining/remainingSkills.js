export default function() {
	const spentSkillPoints = Object.values(this.skills)
		.map((s) => s.score)
		.reduce((sum, s) => sum + s, 0)
	this.startingSkills = this.traits.brains.score * this.startingSkillsMultiplier
	const remainingSkills = this.startingSkills - spentSkillPoints
	this.skillsRemaining = remainingSkills
	return remainingSkills
}