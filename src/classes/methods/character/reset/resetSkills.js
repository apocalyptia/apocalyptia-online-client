export default function() {
	for (const s in this.skills) {
		this.skills[s].score = 0
	}
	this.remainingSkills()
	return this
}