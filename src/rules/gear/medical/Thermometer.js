import Medical from '/src/classes/gear/Medical.js'

const Thermometer = new Medical({
	name: `Thermometer`,
	type: `Medical`,
	desc: [`+1 Medicine.`, `Accurately reads temperature.`],
	sz: 0
})

export default Thermometer
