import Gear from '/src/classes/Gear.js'
import OneHanded from '/src/rules/gear/attributes/OneHanded.js'
import Pierce from '/src/rules/gear/attributes/Pierce.js'
import Rapid from '/src/rules/gear/attributes/Rapid.js'

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