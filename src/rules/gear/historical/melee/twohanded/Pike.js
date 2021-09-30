import Gear from '$classes/Gear.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const Pike = new Gear({
	id: ``,
	name: `Pike`,
	type: `Melee Weapon`,
	sz: 4,
	attr: [
		Pierce,
	]
})
Pike.dmg = 3
Pike.rng = 5

export default Pike