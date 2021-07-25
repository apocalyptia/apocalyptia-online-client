import Projectile from '/src/classes/gear/Projectile.js'

const Mossberg500 = new Projectile({
	accuracy: 0,
	attributes: [],
	caliber: `12g`,
	capacity: 5,
	category: `Shotgun`,
	damage: 5,
	hands: 2,
	name: `Mossberg 500`,
	rate: 1,
	range: 10,
	specialty: `Firearm`,
	size: 2,
	type: `Projectile Weapon`,
})

export default Mossberg500
