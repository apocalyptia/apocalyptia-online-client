import RangedWeapon from '../../../../classes/gear/weapons/RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const Marlin1894 = new RangedWeapon({
	name: `Marlin 1894`,
	sz: 3,
	dmg: 2,
	rng: 30,
	attr: [
		TwoHanded,
	],
	cap: 9,
	cal: `.357`
})

export default Marlin1894