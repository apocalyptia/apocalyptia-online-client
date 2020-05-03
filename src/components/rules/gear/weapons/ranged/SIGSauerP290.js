import RangedWeapon from '../../../../classes/gear/weapons/RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const SIGSauerP290 = new RangedWeapon({
	name: `SIG Sauer P290`,
	sz: 1,
	dmg: 1,
	rng: 5,
	attr: [
		TwoHanded,
	],
	cap: 6,
	cal: `9mm`
})

export default SIGSauerP290