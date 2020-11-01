import Gear from 'classes/Gear.js'

const Stimulant = new Gear({
	id: `e124e538-8a31-4ed3-442e-06c040e353ce`,
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