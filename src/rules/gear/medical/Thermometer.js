import Medical from '$classes/gear/Medical.js'

const Thermometer = new Medical({
	name: `Thermometer`,
	type: `Medical`,
	description: [`+1 Medicine.`, `Accurately reads temperature.`],
	size: 0,
})

export default Thermometer
