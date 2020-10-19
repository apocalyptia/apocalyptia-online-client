import Descriptor from 'rules/description/Descriptor.js'
import RandomSex from 'random/RandomSex.js'


const Sex = new Descriptor({
	id: `d1b5c705-4bf0-4c17-a5c0-b6860abd2d36`,
	name: `Sex`,
	value: ``,
	random: (c) => {
		c.desc.sex.value = RandomSex()
		return c
	}
})

export default Sex