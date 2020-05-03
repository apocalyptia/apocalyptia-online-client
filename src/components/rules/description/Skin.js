import Descriptor from '../../classes/Descriptor'
import RandomSkin from '../../helpers/random/RandomSkin'


const Skin = new Descriptor({
	name: `Skin`,
	value: ``,
	random: (c) => {
		c.desc.skin.value = RandomSkin()
		return c
	}
})

export default Skin