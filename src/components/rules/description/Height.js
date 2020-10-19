import Descriptor from 'rules/description/Descriptor.js'
import RandomHeight from 'random/RandomHeight.js'


const Height = new Descriptor({
	id: `2b4a18f1-1916-4bc8-8037-3ef4c7937b0e`,
	name: `Height`,
	value: ``,
	random: (c) => {
		c.desc.height.value = RandomHeight()
		return c
	}
})

export default Height