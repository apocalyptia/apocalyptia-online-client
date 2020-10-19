import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import OneHanded from 'gear/attributes/weapon/OneHanded.js'
import Chop from 'gear/attributes/weapon/Chop.js'


const Machete = new MeleeWeapon({
	id: `3e6a26a1-df4c-45db-acf0-a33f0948dc5f`,
	name: `Machete`,
	sz: 2,
	dmg: 3,
	rng: 2,
	attr: [
		OneHanded,
		Chop,
	]
})

export default Machete