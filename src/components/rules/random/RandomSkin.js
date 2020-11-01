import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
	c.desc.skin.value = RandomRoll([
		`Black`,
		`Brown`,
		`Olive`,
		`Pale`,
		`Tan`,
		`White`,
	])
	return c
}