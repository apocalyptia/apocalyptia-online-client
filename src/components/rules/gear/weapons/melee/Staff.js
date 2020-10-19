import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Blunt from 'gear/attributes/weapon/Blunt.js'


const Staff = new MeleeWeapon({
	id: `1fab5144-0cd7-440c-93ab-2a9c849941e7`,
	name: `Staff`,
	sz: 3,
	dmg: 2,
	rng: 3,
	attr: [
		TwoHanded,
		Blunt,
	]
})

export default Staff