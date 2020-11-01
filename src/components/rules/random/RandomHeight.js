export default (c) => {
	const totalInches = Math.ceil((Math.random() * 14) + 60) // 5ft low, 5ft7in median, 6ft2in high
	const feet = Math.floor(totalInches / 12)
	const inches = Math.floor(totalInches % 12)
	c.desc.height.value = `${feet}ft ${inches}in`
	return c
}