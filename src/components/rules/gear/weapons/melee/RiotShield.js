import Gear from 'classes/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Blunt from 'attributes/Blunt.js'
import Shield from 'attributes/Shield.js'

const RiotShield = new Gear({
	id: `0e48721b-f535-483a-8bba-1d9e167c38fa`,
	name: `Riot Shield`,
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