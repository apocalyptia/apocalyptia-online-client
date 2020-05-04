import Drug from '../../../classes/gear/Drug'


const Sedative = new Drug({
	name: `Sedative`,
	desc: [
		`Demeanor#6/round to take any action.`,
	],
	sz: 0,
	mix: 12,
	od: true
})

export default Sedative