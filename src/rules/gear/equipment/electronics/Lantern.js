import Gear from 'classes/Gear.js'

const Lantern = new Gear({
	id: ``,
	name: `Lantern`,
	type: `Electronics`,
	desc: [
		`3yd light radius.`,
	],
	sz: 2
})
Lantern.dur = 7200

export default Lantern