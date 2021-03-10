export default (c) => {
	for (let g in c.gear) {
		c.gear[g].inventory = []
	}
}