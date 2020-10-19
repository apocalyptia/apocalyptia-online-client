import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'


const Crossbow = new RangedWeapon({
	id: `5f42d732-9acb-40b6-b74d-fc2e42e107c6`,
	name: `Crossbow`,
	sz: 3,
	dmg: 2,
	rng: 15,
	attr: [
		TwoHanded,
	],
	cap: 1,
	cal: `Arrow`
})

export default Crossbow