import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const SIGSauerP290 = new RangedWeapon({
	id: `16cffbd6-54af-49d2-a531-2d950435250b`,
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