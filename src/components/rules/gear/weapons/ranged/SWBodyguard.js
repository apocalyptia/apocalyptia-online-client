import RangedWeapon from '../../../../classes/gear/weapons/RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const SWBodyguard = new RangedWeapon({
	name: `S&W Bodyguard`,
	sz: 1,
	dmg: 2,
	rng: 5,
	attr: [
		TwoHanded,
	],
	cap: 5,
	cal: `.357`
})

export default SWBodyguard