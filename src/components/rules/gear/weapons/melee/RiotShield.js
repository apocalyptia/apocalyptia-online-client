import MeleeWeapon from '../../../../classes/gear/weapons/MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Blunt from '../../attributes/weapon/Blunt'
import Shield from '../../attributes/weapon/Shield'


const RiotShield = new MeleeWeapon({
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