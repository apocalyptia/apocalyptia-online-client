import Drug from '../../../classes/gear/Drug'


const Alcohol = new Drug({
	name: `Alcohol`,
	desc: [
		`Can be used as an Antibiotic or Fuel.`,
		`C9# or Unstable.`,
	],
	sz: 1,
	mix: 9,
	od: true
})

export default Alcohol