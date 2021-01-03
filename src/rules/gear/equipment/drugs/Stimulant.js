import Gear from 'classes/Gear.js'

const Stimulant = new Gear({
	name: `Stimulant`,
	desc: [
		`Ignore Exhaustion penalties for 6hrs.`,
	],
	sz: 0,
	type: `Drug`
})
Stimulant.mix = 9
Stimulant.od = true

export default Stimulant