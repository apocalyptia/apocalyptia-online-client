import Descriptor from 'rules/description/Descriptor.js'
import RandomWeight from 'random/RandomWeight.js'

const Weight = new Descriptor({
	name: `Weight`,
	value: ``,
	random: (c) => {
		c.description.weight.value = RandomWeight()
		return c
	}
})

export default Weight