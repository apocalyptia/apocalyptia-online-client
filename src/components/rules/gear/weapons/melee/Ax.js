import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Chop from 'gear/attributes/weapon/Chop.js'
import Slow from 'gear/attributes/weapon/Slow.js'


const Ax = new MeleeWeapon({
	id: `a9aead5f-27f8-4727-84b0-6fdd536d52f8`,
	name: `Ax`,
	sz: 4,
	dmg: 4,
	rng: 2,
	attr: [
		TwoHanded,
		Chop,
		Slow,
	]
})

export default Ax