import Drug from '/src/classes/gear/Drug.js'

const Alcohol = new Drug({
	name: `Alcohol`,
	description: [`Can be used as an Antibiotic or Fuel.`, `C9# or Unstable.`],
	size: 1,
	type: `Drug`,
	mix: 9,
	overdose: true,
})

export default Alcohol
