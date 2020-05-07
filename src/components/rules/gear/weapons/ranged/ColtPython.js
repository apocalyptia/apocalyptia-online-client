import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const ColtPython = new RangedWeapon({
	name: `Colt Python`,
	sz: 1,
	dmg: 2,
	rng: 10,
	attr: [
		TwoHanded,
	],
	cap: 6,
	cal: `.357`
})

export default ColtPython