import Descriptor from 'rules/description/Descriptor.js'
import RandomName from 'random/RandomName.js'

const Identity = new Descriptor({
	id: `3d40718f-b0f1-4679-f208-a1a8ee404d5a`,
	name: `Name`,
	value: ``,
	random: (c) => {
		c.desc.name.value = RandomName(c)
		return c
	}
})

export default Identity