import Gear from 'classes/Gear.js'

const Headlamp = new Gear({
	name: `Headlamp`,
	desc: [
		`3yd light. Hands free.`,
	],
	sz: 0
})
Headlamp.dur = 3600

export default Headlamp