import Projectile from '/src/classes/gear/Projectile.js'

const ArmaliteAR15 = new Projectile ({
	accuracy: 1,
	attributes: [],
	caliber: `5.56mm`,
	capacity: 30,
	category: `Rifle`,
	damage: 3,
	hands: 2,
	name: `Armalite AR-15`,
	rate: 2,
	range: 50,
	specialty: `Firearm`,
	size: 3,
	type: `Projectile Weapon`,
})

export default ArmaliteAR15
