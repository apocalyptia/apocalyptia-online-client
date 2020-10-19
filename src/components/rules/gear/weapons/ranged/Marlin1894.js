import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'


const Marlin1894 = new RangedWeapon({
	id: `19c418dd-d00d-4a43-bc71-7c373d8aefe9`,
	name: `Marlin 1894`,
	sz: 3,
	dmg: 2,
	rng: 30,
	attr: [
		TwoHanded,
	],
	cap: 9,
	cal: `.357`
})

export default Marlin1894