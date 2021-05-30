import Gear from '../../../classes/Gear.js'
import TwoHanded from '../attributes/TwoHanded.js'

const Sword = new Gear({
	name: `Sword`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [TwoHanded]
})
Sword.dmg = 4
Sword.rng = 2

export default Sword
