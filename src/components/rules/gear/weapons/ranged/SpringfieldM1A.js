import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Rapid from 'gear/attributes/weapon/Rapid.js'


const SpringfieldM1A = new RangedWeapon({
	id: `ea8867ac-4563-425f-b999-1195cd6f350e`,
	name: `Springfield M1A`,
	sz: 4,
	dmg: 3,
	rng: 80,
	attr: [
		TwoHanded,
		Rapid,
	],
	cap: 20,
	cal: `.308`
})

export default SpringfieldM1A