export default function() {
	this.meta.traitsRemaining = Object.values(this.traits)
									.map((t) => t.score)
									.reduce((sum, t) => sum - t, this.meta.startingTraits)
	return this
}