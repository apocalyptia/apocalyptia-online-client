import Wearable from '/src/classes/gear/Wearable.js'

const DuffelBag = new Wearable({
	name: `Duffel Bag`,
	desc: [`2 rounds to access.`],
	sz: 3
})
DuffelBag.slots = 40

export default DuffelBag
