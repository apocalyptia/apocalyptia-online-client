export default (c) => {
	for (let t in c.traits) {
		c.traits[t].score = 1
	}
	return c.resetSkills()
}