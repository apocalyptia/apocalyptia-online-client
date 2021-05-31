import Melee from '/src/classes/gear/Melee.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Blunt from '../attributes/Blunt.js'

const BaseballBat = new Melee({
	name: `Baseball Bat`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [TwoHanded, Blunt]
})
BaseballBat.dmg = 3
BaseballBat.rng = 2

export default BaseballBat
