import Gear from '../../../classes/Gear.js'
import OneHanded from '../attributes/OneHanded.js'
import Blunt from '../attributes/Blunt.js'
import Shield from '../attributes/Shield.js'

const RiotShield = new Gear({
	name: `Riot Shield`,
	type: `Melee Weapon`,
	sz: 4,
	attr: [OneHanded, Blunt, Shield]
})
RiotShield.dmg = 0
RiotShield.rng = 1

export default RiotShield
