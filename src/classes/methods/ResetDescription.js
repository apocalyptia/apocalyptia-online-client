export default (c) => {
	for (let d in c.description) {
		if (c.description[d].name != `Player`) {
			c.description[d].value = ``
		}
	}
	return c
}