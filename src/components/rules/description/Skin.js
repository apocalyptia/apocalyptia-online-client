import Descriptor from './Descriptor'
import RandomSkin from '../../helpers/random/RandomSkin'


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