import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import OneHanded from 'gear/attributes/weapon/OneHanded.js'
import Blunt from 'gear/attributes/weapon/Blunt.js'


const BrassKnuckles = new MeleeWeapon({
	id: `eaf2a5df-a818-4ec7-bace-25a303895fd8`,
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