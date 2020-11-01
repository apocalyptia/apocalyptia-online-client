import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
	c.desc.hair.value = RandomRoll([
		`Auburn`,
		`Bald`,
		`Black`,
		`Blonde`,
		`Brunette`,
		`Gray`,
		`Red`,
		`White`,
	])
	return c
}