import Gear from 'classes/Gear.js'

const Megaphone = new Gear({
	id: ``,
	name: `Megaphone`,
	type: `Electronics`,
	desc: [
		`+1 Leadership when speaking to a crowd.`,
	],
	sz: 2
})
Megaphone.dur = 14400

export default Megaphone