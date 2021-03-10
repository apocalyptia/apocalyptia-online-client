export default (c) => {
	for (let h in c.health) {
		if (h == `torso`) {
			c.health[h].current = c.traits.constitution.score * 2
			c.health[h].score = c.traits.constitution.score * 2
		}
		else {
			c.health[h].current = c.traits.constitution.score
			c.health[h].score = c.traits.constitution.score
		}
		c.health[h]
	}
	c.resetAbilities(c)
}