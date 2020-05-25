import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const ColtPython = new RangedWeapon({
	id: `8c4ba934-2850-4025-a9bf-188cc08a1c9c`,
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