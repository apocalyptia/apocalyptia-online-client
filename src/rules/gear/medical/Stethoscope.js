import Medical from '/src/classes/gear/Medical.js'

const Stethoscope = new Medical({
	name: `Stethoscope`,
	type: `Medical`,
	description: [`+1 Medicine.`, `Perception (Hear) 6# through doors.`],
	size: 0,
})

export default Stethoscope
