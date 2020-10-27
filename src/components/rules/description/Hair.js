import Descriptor from 'rules/description/Descriptor.js'
import RandomHair from 'random/RandomHair.js'

const Hair = new Descriptor({
	id: `ac814cf2-690a-4cc5-0c0b-6a442523f50a`,
	name: `Hair`,
	value: ``,
	random: (c) => {
		c.desc.hair.value = RandomHair()
		return c
	}
})

export default Hair