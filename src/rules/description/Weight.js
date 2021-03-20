import Descriptor from '/src/rules/description/Descriptor.js'
import RandomWeight from '/src/rules/random/RandomWeight.js'

const Weight = new Descriptor({
	name: `Weight`,
	value: ``,
	random: (c) => {
		c.description.weight.value = RandomWeight()
		return c
	}
})

export default Weight