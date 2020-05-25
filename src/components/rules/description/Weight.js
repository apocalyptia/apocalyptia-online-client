import Descriptor from './Descriptor'
import RandomWeight from '../../helpers/random/RandomWeight'


const Weight = new Descriptor({
	id: `57ddc83f-3a36-4472-028e-dd7797344f82`,
	name: `Weight`,
	value: ``,
	random: (c) => {
		c.desc.weight.value = RandomWeight()
		return c
	}
})

export default Weight