import Gear from '$classes/Gear.js'
import Blunt from '$rules/gear/attributes/Blunt.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const Warhammer = new Gear({
	id: ``,
	name: `Warhammer`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		Blunt,
		Pierce,
	]
})
Warhammer.dmg = 2
Warhammer.rng = 2

export default Warhammer