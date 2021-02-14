import Gear from 'classes/Gear.js'

const SolarLamp = new Gear({
	id: ``,
	name: `Solar Lamp`,
	type: `Electronics`,
	desc: [
		`1yd light radius.`,
		`1 day charge.`,
	],
	sz: 1
})
SolarLamp.dur = 10800

export default SolarLamp