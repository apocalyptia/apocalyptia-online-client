import Melee from '/src/classes/gear/Melee.js'

const Sword = new Melee({
	accuracy: 0,
	attributes: [],
	damage: 4,
	hands: 2,
	name: `Sword`,
	penetration: 0,
	range: 2,
	size: 3,
	type: `Melee Weapon`
})

export default Sword
