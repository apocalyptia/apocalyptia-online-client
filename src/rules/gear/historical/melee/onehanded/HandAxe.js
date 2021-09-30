import Gear from '$classes/Gear.js'
import Chop from '$rules/gear/attributes/Chop.js'

const HandAxe = new Gear({
	id: ``,
	name: `Hand Axe`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		Chop,
	]
})
HandAxe.dmg = 1
HandAxe.rng = 1

export default HandAxe