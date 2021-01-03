import Gear from 'classes/Gear.js'

const Laser = new Gear({
	name: `Laser`,
	type: `Accessory`,
	desc: [
		`+1 to Ranged Attacks.`,
		`Make a Called Shot Ranged Attack at the Head to Blind for d6 rounds.`,
	],
	sz: 0
})
Laser.dur = 14400

export default Laser