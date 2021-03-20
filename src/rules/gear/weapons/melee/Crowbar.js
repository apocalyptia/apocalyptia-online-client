import Gear from '/src/classes/Gear.js'
import OneHanded from '/src/rules/gear/attributes/OneHanded.js'

const Crowbar = new Gear({
	id: ``,
	name: `Crowbar`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		OneHanded,
	]
})
Crowbar.dmg = 3
Crowbar.rng = 2

export default Crowbar