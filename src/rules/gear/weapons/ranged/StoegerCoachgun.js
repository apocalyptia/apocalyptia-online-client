import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'
import Scatter from '../../attributes/weapon/Scatter'


const StoegerCoachgun = new RangedWeapon({
	id: `045bf20f-49ff-4fb5-b300-6088553c066d`,
	name: `Stoeger Coach Gun`,
	sz: 3,
	dmg: 4,
	rng: 15,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	],
	cap: 2,
	cal: `12g`
})

export default StoegerCoachgun