import Descriptor from './Descriptor'
import RandomWeight from '../../helpers/random/RandomWeight'


const Weight = new Descriptor({
	name: `Weight`,
	value: ``,
	random: (c) => {
		c.desc.weight.value = RandomWeight()
		return c
	}
})

export default Weight