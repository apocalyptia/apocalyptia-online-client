import Medical from '../../../classes/gear/Medical'


const Stethoscope = new Medical({
	name: `Stethoscope`,
	desc: [
		`+1 Medicine.`,
		`Perception(Hear) 6# through doors.`,
	],
	sz: 1
})

export default Stethoscope