import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const SWBodyguard = new RangedWeapon({
	id: `2b58cb89-7b72-42cf-9ec0-d524e5e886a6`,
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