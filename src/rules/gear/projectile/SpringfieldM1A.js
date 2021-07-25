import Projectile from '/src/classes/gear/Projectile.js'

const SpringfieldM1A = new Projectile({
	accuracy: 0,
	attributes: [],
	caliber: `.308`,
	capacity: 20,
	category: `Rifle`,
	damage: 6,
	hands: 2,
	name: `Springfield M1A`,
	rate: 2,
	range: 80,
	specialty: `Firearm`,
	size: 4,
	type: `Projectile Weapon`,
})

export default SpringfieldM1A
