import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Auto from 'gear/attributes/weapon/Auto.js'
import Rapid from 'gear/attributes/weapon/Rapid.js'


const HKMP5 = new RangedWeapon({
	id: `e9381665-1e1f-48ff-b07f-80bba3f81773`,
	name: `H&K MP5`,
	sz: 3,
	dmg: 1,
	rng: 20,
	attr: [
		TwoHanded,
		Auto,
		Rapid,
	],
	cap: 30,
	cal: `9mm`
})

export default HKMP5