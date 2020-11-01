import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
	c.desc.sex.value = RandomRoll([`Female`, `Male`])
	return c
}