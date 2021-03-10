export default (c) => {
	for (let p in c.properties) {
		c.properties[p].score = 0
		c.properties[p].current = 0
	}
	c.updateProperties(c)
	c.resetHealth(c)
}