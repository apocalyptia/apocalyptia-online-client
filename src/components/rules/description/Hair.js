import Descriptor from './Descriptor'
import RandomHair from '../../helpers/random/RandomHair'


const Hair = new Descriptor({
	name: `Hair`,
	value: ``,
	random: (c) => {
		c.desc.hair.value = RandomHair()
		return c
	}
})

export default Hair