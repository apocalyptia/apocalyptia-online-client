import Drug from '../../../classes/gear/Drug'


const Painkiller = new Drug({
	name: `Painkiller`,
	desc: [
		`Ignore 1 Pain penalty.`,
	],
	sz: 0,
	mix: 9,
	od: true
})

export default Painkiller