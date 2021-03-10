export default (c) => {
	for (let s in c.skills) {
		c.skills[s].score = 0
	}
	c.resetProperties(c)
}