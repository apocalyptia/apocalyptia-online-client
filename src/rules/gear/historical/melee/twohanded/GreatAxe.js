import Gear from '$classes/Gear.js'
import Chop from '$rules/gear/attributes/Chop.js'
import Slow from '$rules/gear/attributes/Slow.js'

const GreatAxe = new Gear({
	id: ``,
	name: `Great Axe`,
	type: `Melee Weapon`,
	sz: 4,
	attr: [
		Chop,
		Slow,
	]
})
GreatAxe.dmg = 4
GreatAxe.rng = 3

export default GreatAxe