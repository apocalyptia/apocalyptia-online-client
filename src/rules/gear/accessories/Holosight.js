import Accessory from '/src/classes/gear/Accessory.js'

const Holosight = new Accessory({
	name: `Holosight`,
	type: `Accessory`,
	description: [`+1 to Projectile Attacks.`],
	size: 0,
})
Holosight.duration = 28800

export default Holosight
