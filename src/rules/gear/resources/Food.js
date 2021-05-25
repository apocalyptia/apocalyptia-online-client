import Gear from '../../../classes/Gear.js' 

const Food = new Gear({
	name: `Food`,
	type: `Resource`,
	desc: [
		`1 unit Needed per day to prevent Starvation.`,
	],
	sz: 1
})

export default Food