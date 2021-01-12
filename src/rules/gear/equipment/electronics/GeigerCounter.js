import Gear from 'classes/Gear.js'

const GeigerCounter = new Gear({
	id: ``,
	name: `Geiger Counter`,
	type: `Electronics`,
	desc: [
		`Science 6# to detect Radiation in 1yd.`,
	],
	sz: 2
})
GeigerCounter.dur = 28800

export default GeigerCounter