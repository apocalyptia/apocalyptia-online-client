import Projectile from '$classes/gear/Projectile.js'

const BrowningABolt = new Projectile ({
	accuracy: 1,
	attributes: [],
	caliber: `5.56mm`,
	capacity: 5,
	category: `Rifle`,
	damage: 3,
	hands: 2,
	name: `Browning A-Bolt`,
	rate: 1,
	range: 60,
	specialty: `Firearm`,
	size: 4,
	type: `Projectile Weapon`,
})

export default BrowningABolt
