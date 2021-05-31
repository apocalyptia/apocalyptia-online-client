import Electronic from '/src/classes/gear/Electronic.js'

const EmergencyRadio = new Electronic({
	name: `Emergency Radio`,
	type: `Electronics`,
	desc: [`AM/FM/Shortwave.`, `1yd light.`],
	sz: 1
})
EmergencyRadio.dur = 7200

export default EmergencyRadio
