import Gear from 'classes/Gear.js'

const HandRadio = new Gear({
	name: `Hand Radio`,
	desc: [
		`9-channel 2-way radio.`,
		`3 mile range.`,
	],
	sz: 1
})
HandRadio.dur = 10800

export default HandRadio