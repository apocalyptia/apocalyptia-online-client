export default function() {
	for (const t in this.traits) {
		this.traits[t].score = 1
	}
	this.remainingTraits()
	this.resetSkills()
	this.resetGear()
	return this
}