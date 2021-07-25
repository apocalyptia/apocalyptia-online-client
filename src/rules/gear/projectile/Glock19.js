import Projectile from '/src/classes/gear/Projectile.js'

const Glock19 = new Projectile({
	accuracy: 0,
	attributes: [],
	caliber: `9mm`,
	capacity: 17,
	category: `Pistol`,
	damage: 1,
	hands: 2,
	name: `Glock 19`,
	rate: 2,
	range: 10,
	specialty: `Firearm`,
	size: 1,
	type: `Projectile Weapon`,
})

export default Glock19
