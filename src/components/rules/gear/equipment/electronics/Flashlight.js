import Gear from 'classes/Gear.js'

const Flashlight = new Gear({
	id: `100f3da0-5b60-4a73-b828-0009c2702bf0`,
	name: `Flashlight`,
	desc: [
		`10yd light. -3 Ranged Attack to Blind 1 round.`,
	],
	sz: 1
})
Flashlight.dur = 3600

export default Flashlight