import Projectile from '/src/classes/gear/Projectile.js'

const BarnettCrossbow = new Projectile ({
	accuracy: 0,
	attributes: [],
	caliber: `Arrow`,
	capacity: 1,
	category: `Archery`,
	damage: 3,
	hands: 2,
	name: `Barnett Crossbow`,
	rate: 1,
	range: 15,
	specialty: `Traditional`,
	size: 3,
	type: `Projectile Weapon`,
})

export default BarnettCrossbow
