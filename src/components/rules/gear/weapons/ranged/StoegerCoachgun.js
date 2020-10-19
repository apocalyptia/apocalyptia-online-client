import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Rapid from 'gear/attributes/weapon/Rapid.js'
import Scatter from 'gear/attributes/weapon/Scatter.js'


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