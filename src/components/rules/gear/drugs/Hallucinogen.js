import Drug from '../../../classes/gear/Drug'


const Hallucinogen = new Drug({
	name: `Hallucinogen`,
	desc: [
		`+1 Perform and Tame, -3 to all other rolls, and -1 Psyche.`,
	],
	sz: 0,
	mix: 15,
	od: false
})

export default Hallucinogen