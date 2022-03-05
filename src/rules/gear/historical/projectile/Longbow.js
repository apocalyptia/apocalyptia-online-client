import Projectile from '$classes/gear/Projectile.js'

const Longbow = new Projectile ({
	accuracy: 0,
	attributes: [],
	caliber: `Arrow`,
	capacity: 1,
	category: `Archery`,
	damage: 2,
	hands: 2,
	name: `Longbow`,
	rate: 1,
	range: 15,
	specialty: `Traditional`,
	size: 3,
	type: `Projectile Weapon`,
})

export default Longbow
