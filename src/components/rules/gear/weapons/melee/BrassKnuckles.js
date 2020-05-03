import MeleeWeapon from '../../../../classes/gear/weapons/MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Blunt from '../../attributes/weapon/Blunt'


const BrassKnuckles = new MeleeWeapon({
	name: `Brass Knuckles`,
	sz: 1,
	dmg: 1,
	rng: 1,
	attr: [
		OneHanded,
		Blunt,
	]
})

export default BrassKnuckles