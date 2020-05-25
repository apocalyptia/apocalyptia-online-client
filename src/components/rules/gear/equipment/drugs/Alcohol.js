import Drug from './Drug'


const Alcohol = new Drug({
	id: `de0dd5f5-8630-4827-121d-e39fc099a9ab`,
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