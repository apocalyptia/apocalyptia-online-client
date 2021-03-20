import Gear from '/src/classes/Gear.js'
import OneHanded from '/src/rules/gear/attributes/OneHanded.js'
import Blunt from '/src/rules/gear/attributes/Blunt.js'
import Shield from '/src/rules/gear/attributes/Shield.js'

const RiotShield = new Gear({
	id: ``,
	name: `Riot Shield`,
	type: `Melee Weapon`,
	sz: 4,
	attr: [
		OneHanded,
		Blunt,
		Shield,
	]
})
RiotShield.dmg = 0
RiotShield.rng = 1

export default RiotShield