import Gear from 'classes/Gear.js'

const Laser = new Gear({
	name: `Laser`,
	desc: [
		`+1 Ranged Attack.`,
		`-6 Ranged Attack to Blind for d6 rounds.`,
	],
	sz: 0
})
Laser.dur = 14400

export default Laser