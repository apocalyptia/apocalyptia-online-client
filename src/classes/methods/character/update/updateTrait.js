export default function(trait) {
	const traitKey = trait.name.toLowerCase()
	this.traits[traitKey].score = parseInt(trait.score)
	this.remainingTraits()
	while (
		this.meta.traitsRemaining < 0 ||
		trait.score > this.meta.maxTraits
	) {
		this.traits[traitKey].score--
		this.remainingTraits()
	}
	this.resetSkills()
	this.updateProperties()
	this.remainingSkills()
	return this
}