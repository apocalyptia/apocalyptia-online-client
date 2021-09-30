import Gear from '$classes/Gear.js'
// import Mounted from '$rules/gear/attributes/Mounted.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const Lance = new Gear({
	id: ``,
	name: `Lance`,
	type: `Melee Weapon`,
	sz: 5,
	attr: [
		// Mounted,
		Pierce,
	]
})
Lance.dmg = 3
Lance.rng = 5

export default Lance