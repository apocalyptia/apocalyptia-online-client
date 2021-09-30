import Gear from '$classes/Gear.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const Shortsword = new Gear({
	id: ``,
	name: `Shortsword`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		Pierce,
	]
})
Shortsword.dmg = 2
Shortsword.rng = 2

export default Shortsword