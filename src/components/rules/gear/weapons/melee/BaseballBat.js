import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Blunt from 'attributes/Blunt.js'

const BaseballBat = new Gear({
	id: `16a7ae03-024b-450b-9ce9-082b225f3021`,
	name: `Baseball Bat`,
	sz: 3,
	attr: [
		TwoHanded,
		Blunt,
	]
})
BaseballBat.dmg = 3
BaseballBat.rng = 2

export default BaseballBat