import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'


const SavageMkII = new RangedWeapon({
	id: `8465b895-4bd0-4c54-b1bb-f411a962ddbb`,
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