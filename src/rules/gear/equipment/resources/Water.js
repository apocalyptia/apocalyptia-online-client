import Gear from '$classes/Gear.js'

const Water = new Gear({
	id: ``,
	name: `Water`,
	type: `Resource`,
	desc: [
		`1 unit Needed per day to prevent Dehydration.`,
	],
	sz: 1
})

export default Water