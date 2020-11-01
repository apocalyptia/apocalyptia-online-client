import Gear from 'classes/Gear.js'

const DuffelBag = new Gear({
	id: `8b2feee5-b9c9-4a0e-9e9b-c4971de669c3`,
	name: `Duffel Bag`,
	desc: [
		`2 rounds to access.`,
	],
	sz: 3
})
DuffelBag.slots = 40

export default DuffelBag