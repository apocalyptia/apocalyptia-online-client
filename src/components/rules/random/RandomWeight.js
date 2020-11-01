export default (c) => {
	c.desc.weight.value = `${Math.ceil(Math.random() * 100) + 100}lbs`
	return c
} // 101 to 200 lbs