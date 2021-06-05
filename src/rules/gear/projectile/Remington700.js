import Projectile from '/src/classes/gear/Projectile.js'

const Remington700 = new Projectile({
	accuracy: 1,
	attributes: [],
	caliber: `.308`,
	capacity: 5,
	category: `Rifle`,
	damage: 6,
	hands: 2,
	name: `Remington 700`,
	rate: 1,
	range: 100,
	specialty: `Firearm`,
	size: 4,
	type: `Projectile Weapon`
})

export default Remington700
