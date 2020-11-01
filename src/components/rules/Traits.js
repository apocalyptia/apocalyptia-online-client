export default {
	name: `Traits`,
	max: 6,
	startingPoints: 14,
	text: [
		`You get ${startingPoints} Trait points to assign.`,
		`Traits range from 1 to ${max}.`,
		`Trait rolls are [d6 + Trait].`,
		`Trait scores set the limit for their Skills.`,
	],
	assign: function(c, target) {
		c.traits[target.name].score = parseInt(target.value)
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		while(this.remaining(c) < 0) c.traits[targetName].score--
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.traits).reduce((t, { score }) => t += score, 0)
		return this.startingPoints() - spent
	}
}