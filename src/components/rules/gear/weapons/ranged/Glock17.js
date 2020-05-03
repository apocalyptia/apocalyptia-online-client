import RangedWeapon from '../../../../classes/gear/weapons/RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'


const Glock17 = new RangedWeapon({
	name: `Glock 17`,
	sz: 1,
	dmg: 1,
	rng: 10,
	attr: [
		TwoHanded,
		Rapid,
	],
	cap: 17,
	cal: `9mm`
})

export default Glock17