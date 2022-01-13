import Gear from '$classes/Gear.js'
import Chop from '$rules/gear/attributes/Chop.js'
import Slow from '$rules/gear/attributes/Slow.js'

const BroadAxe = new Gear({
	id: ``,
	name: `Broad Axe`,
	type: `Melee Weapon`,
	sz: 4,
	attr: [
		Chop,
		Slow,
	]
})
BroadAxe.dmg = 4
BroadAxe.rng = 3

export default BroadAxe