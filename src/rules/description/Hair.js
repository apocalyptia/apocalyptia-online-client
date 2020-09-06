import Descriptor from './Descriptor'
import RandomHair from '../../helpers/random/RandomHair'


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