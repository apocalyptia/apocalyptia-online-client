import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import OneHanded from 'gear/attributes/weapon/OneHanded.js'
import Blunt from 'gear/attributes/weapon/Blunt.js'
import Shield from 'gear/attributes/weapon/Shield.js'


const RiotShield = new MeleeWeapon({
	id: `0e48721b-f535-483a-8bba-1d9e167c38fa`,
	name: `Riot Shield`,
	sz: 4,
	dmg: 0,
	rng: 1,
	attr: [
		OneHanded,
		Blunt,
		Shield,
	]
})

export default RiotShield