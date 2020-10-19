import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Rapid from 'gear/attributes/weapon/Rapid.js'


const RugerMkIII = new RangedWeapon({
	id: `739a925f-6d37-4e3f-a15d-af15248fbe1e`,
	name: `Ruger Mk.III`,
	sz: 1,
	dmg: 1,
	rng: 15,
	attr: [
		TwoHanded,
		Rapid,
	],
	cap: 10,
	cal: `.22`
})

export default RugerMkIII