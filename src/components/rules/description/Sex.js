import Descriptor from './Descriptor'
import RandomSex from '../../helpers/random/RandomSex'


const Sex = new Descriptor({
	name: `Sex`,
	value: ``,
	random: (c) => {
		c.desc.sex.value = RandomSex()
		return c
	}
})

export default Sex