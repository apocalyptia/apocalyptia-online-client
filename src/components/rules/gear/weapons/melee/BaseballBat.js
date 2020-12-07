import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Blunt from 'attributes/Blunt.js'

const BaseballBat = new Gear({
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