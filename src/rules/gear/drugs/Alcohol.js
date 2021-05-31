import Drug from '/src/classes/gear/Drug.js'

const Alcohol = new Drug({
	name: `Alcohol`,
	desc: [`Can be used as an Antibiotic or Fuel.`, `C9# or Unstable.`],
	sz: 1,
	type: `Drug`
})
Alcohol.mix = 9
Alcohol.od = true

export default Alcohol
