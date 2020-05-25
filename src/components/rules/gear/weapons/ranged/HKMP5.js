import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Auto from '../../attributes/weapon/Auto'
import Rapid from '../../attributes/weapon/Rapid'


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