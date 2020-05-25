import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Blunt from '../../attributes/weapon/Blunt'
import Shield from '../../attributes/weapon/Shield'


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