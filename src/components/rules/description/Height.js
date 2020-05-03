import Descriptor from '../../classes/Descriptor'
import RandomHeight from '../../helpers/random/RandomHeight'


const Height = new Descriptor({
	name: `Height`,
	value: ``,
	random: (c) => {
		c.desc.height.value = RandomHeight()
		return c
	}
})

export default Height