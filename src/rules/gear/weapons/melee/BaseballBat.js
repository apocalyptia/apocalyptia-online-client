import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Blunt from '/src/rules/gear/attributes/Blunt.js'

const BaseballBat = new Gear({
	id: ``,
	name: `Baseball Bat`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		TwoHanded,
		Blunt,
	]
})
BaseballBat.dmg = 3
BaseballBat.rng = 2

export default BaseballBat