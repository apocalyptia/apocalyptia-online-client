import Gear from 'classes/Gear.js'

const EmergencyRadio = new Gear({
	name: `Emergency Radio`,
	desc: [
		`AM/FM/Shortwave.`,
		`1yd light.`,
	],
	sz: 1
})
EmergencyRadio.dur = 7200

export default EmergencyRadio