import Melee from '/src/classes/gear/Melee.js'

const Spear = new Melee({
	accuracy: 0,
	attributes: [],
	damage: 4,
	hands: 1,
	name: `Spear`,
	penetration: 1,
	range: 3,
	size: 3,
	type: `Melee Weapon`,
})

export default Spear
