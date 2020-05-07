import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const SavageMkII = new RangedWeapon({
	name: `Savage Mk.II`,
	sz: 3,
	dmg: 1,
	rng: 40,
	attr: [
		TwoHanded,
	],
	cap: 10,
	cal: `.22`
})

export default SavageMkII