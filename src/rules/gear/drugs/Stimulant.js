import Drug from '/src/classes/gear/Drug.js'

const Stimulant = new Drug({
	name: `Stimulant`,
	desc: [`Ignore Exhaustion penalties for 6hrs.`],
	sz: 0,
	type: `Drug`
})
Stimulant.mix = 9
Stimulant.od = true

export default Stimulant
