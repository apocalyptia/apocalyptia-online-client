import Accessory from '/src/classes/gear/Accessory.js'

const Laser = new Accessory({
	name: `Laser`,
	type: `Accessory`,
	desc: [`+1 to Projectile Attacks.`, `Make a Called Shot Projectile Attack at the Head to Blind for d6 rounds.`],
	sz: 0
})
Laser.dur = 14400

export default Laser
