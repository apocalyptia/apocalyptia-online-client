import Gear from 'classes/Gear.js'

const SolarLamp = new Gear({
	id: `aa480ec7-9df9-4011-ff78-d4b34567c144`,
	name: `Solar Lamp`,
	desc: [
		`1yd light radius.`,
		`1 day charge.`,
	],
	sz: 1
})
SolarLamp.dur = 10800

export default SolarLamp