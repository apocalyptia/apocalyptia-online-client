import Drug from './Drug'


const Stimulant = new Drug({
	id: `e124e538-8a31-4ed3-442e-06c040e353ce`,
	name: `Stimulant`,
	desc: [
		`Ignore Exhaustion penalties for 6hrs.`,
	],
	sz: 0,
	mix: 9,
	od: true
})

export default Stimulant