import Drug from '../../../classes/gear/Drug'


const Antibiotic = new Drug({
	name: `Antibiotic`,
	desc: [
		`Prevents infection in Recovery for 1 day.`,
	],
	sz: 0,
	mix: 12,
	od: false
})

export default Antibiotic