import Gear from '$classes/Gear.js'
import Chop from '$rules/gear/attributes/Chop.js'
import Slow from '$rules/gear/attributes/Slow.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const Poleaxe = new Gear({
	id: ``,
	name: `Poleaxe`,
	type: `Melee Weapon`,
	sz: 4,
	attr: [
		Chop,
		Pierce,
		Slow,
	]
})
Poleaxe.dmg = 4
Poleaxe.rng = 3

export default Poleaxe