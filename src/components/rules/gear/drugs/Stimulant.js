import Drug from '../../../classes/gear/Drug'


const Stimulant = new Drug({
	name: `Stimulant`,
	desc: [
		`Ignore Exhaustion penalties for 6hrs.`,
	],
	sz: 0,
	mix: 9,
	od: true
})

export default Stimulant