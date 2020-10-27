import Gear from 'gear/Gear.js'

const Laser = new Gear({
	id: `03f0ef12-bcc9-43de-aa5a-3e9cfaa51025`,
	name: `Laser`,
	desc: [
		`+1 Ranged Attack.`,
		`-6 Ranged Attack to Blind for d6 rounds.`,
	],
	sz: 0
})
Laser.dur = 14400

export default Laser