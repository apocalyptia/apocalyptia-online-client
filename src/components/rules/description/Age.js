import Descriptor from 'rules/description/Descriptor.js'
import RandomAge from 'random/RandomAge.js'

const Age = new Descriptor({
	id: `e0c4af2f-7735-4a18-4e14-60065d24740a`,
	name: `Age`,
	value: ``,
	random: (c) => {
		c.desc.age.value = RandomAge()
		return c
	}
})

export default Age