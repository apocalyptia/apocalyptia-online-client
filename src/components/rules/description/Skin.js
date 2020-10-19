import Descriptor from 'rules/description/Descriptor.js'
import RandomSkin from 'random/RandomSkin.js'


const Skin = new Descriptor({
	id: `e8515d9e-3acb-4038-9a63-714c62dbfd3a`,
	name: `Skin`,
	value: ``,
	random: (c) => {
		c.desc.skin.value = RandomSkin()
		return c
	}
})

export default Skin