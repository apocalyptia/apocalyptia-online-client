import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Blunt from 'gear/attributes/weapon/Blunt.js'


const BaseballBat = new MeleeWeapon({
	id: `16a7ae03-024b-450b-9ce9-082b225f3021`,
	name: `Baseball Bat`,
	sz: 3,
	dmg: 3,
	rng: 2,
	attr: [
		TwoHanded,
		Blunt,
	]
})

export default BaseballBat