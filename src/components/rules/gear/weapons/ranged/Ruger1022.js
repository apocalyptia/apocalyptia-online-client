import RangedWeapon from '../../../../classes/gear/weapons/RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'


const Ruger1022 = new RangedWeapon({
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