export default (c) => {
	c.desc.age.value = Math.ceil((Math.random() * 33) + 17)
	return c
} // 17 to 50