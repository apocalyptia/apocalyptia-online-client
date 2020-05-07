import Descriptor from './Descriptor'
import RandomName from '../../helpers/random/RandomName'


const Identity = new Descriptor({
	name: `Name`,
	value: ``,
	random: (c) => {
		c.desc.identity.value = RandomName(c.desc.sex.value)
		return c
	}
})

export default Identity