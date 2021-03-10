export default (c) => {
	c.meta = {
		id: ``,
		user: ``,
		created: ``,
		modified: ``,
		notes: ``,
		status: [],
		step: 0,
		proceed: false,
		coordinates: {
			m: ``,
			f: 0,
			x: 0,
			y: 0,
			z: 0
		}
	}
	return c.meta
}