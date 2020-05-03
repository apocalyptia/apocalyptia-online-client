import MeleeWeapon from '../../../../classes/gear/weapons/MeleeWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Chop from '../../attributes/weapon/Chop'
import Slow from '../../attributes/weapon/Slow'


const Ax = new MeleeWeapon({
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