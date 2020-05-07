import Descriptor from './Descriptor'
import RandomAge from '../../helpers/random/RandomAge'

const Age = new Descriptor({
	name: `Age`,
	value: ``,
	random: (c) => {
		c.desc.age.value = RandomAge()
		return c
	}
})

export default Age