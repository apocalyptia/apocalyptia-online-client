export default function() {
	const spentTraitPoints = Object.values(this.traits)
		.map((t) => t.score)
		.reduce((sum, t) => sum + t, 0)
	const remainingTraits = this.startingTraits - spentTraitPoints
	this.traitsRemaining = remainingTraits
	return remainingTraits
}