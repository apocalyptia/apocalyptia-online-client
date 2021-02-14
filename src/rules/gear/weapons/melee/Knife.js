import Gear from 'classes/Gear.js'
import OneHanded from 'rules/gear/attributes/OneHanded.js'
import Pierce from 'rules/gear/attributes/Pierce.js'
import Rapid from 'rules/gear/attributes/Rapid.js'

const Knife = new Gear({
	id: ``,
	name: `Knife`,
	type: `Melee Weapon`,
	sz: 1,
	attr: [
		OneHanded,
		Pierce,
		Rapid,
	]
})
Knife.dmg = 1
Knife.rng = 1

export default Knife