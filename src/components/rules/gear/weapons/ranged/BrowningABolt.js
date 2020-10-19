import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'


const BrowningABolt = new RangedWeapon({
	id: `dc61759b-4432-456b-91c5-981c3b34fc65`,
	name: `Browning A-Bolt`,
	sz: 4,
	dmg: 3,
	rng: 60,
	attr: [
		TwoHanded,
	],
	cap: 5,
	cal: `5.56`
})

export default BrowningABolt