import Accessory from '/src/classes/gear/Accessory.js'

const Holosight = new Accessory({
	name: `Holosight`,
	type: `Accessory`,
	desc: [`+1 to Projectile Attacks.`],
	sz: 0
})
Holosight.dur = 28800

export default Holosight
