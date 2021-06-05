import Melee from '/src/classes/gear/Melee.js'

const Machete = new Melee({
	accuracy: 0,
	attributes: [],
	damage: 3,
	hands: 1,
	name: `Machete`,
	penetration: -1,
	range: 2,
	size: 2,
	type: `Melee Weapon`
})

export default Machete
