export default (c, userId) => {
	if (!c.created) {
		c.created = new Date()
	}
	c.meta.user = userId
	c.meta.step = c.limit
	c.meta.modified = new Date()
	return c
}