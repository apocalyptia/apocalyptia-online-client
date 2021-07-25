import Projectile from '/src/classes/gear/Projectile.js'

const MAC10 = new Projectile({
	accuracy: -1,
	attributes: [],
	caliber: `.45ACP`,
	capacity: 30,
	category: `SMG`,
	damage: 1,
	hands: 2,
	name: `MAC-10`,
	rate: 3,
	range: 20,
	specialty: `Firearm`,
	size: 2,
	type: `Projectile Weapon`,
})

export default MAC10
