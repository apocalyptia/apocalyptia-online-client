import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Rapid from 'gear/attributes/weapon/Rapid.js'


const Ruger1022 = new RangedWeapon({
	id: `94dc2629-a460-4bdc-a90f-0ade229af021`,
	name: `Ruger 10/22`,
	sz: 3,
	dmg: 1,
	rng: 30,
	attr: [
		TwoHanded,
		Rapid,
	],
	cap: 10,
	cal: `.22`
})

export default Ruger1022