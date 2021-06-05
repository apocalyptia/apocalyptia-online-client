import Wearable from '/src/classes/gear/Wearable.js'

const DuffelBag = new Wearable({
	name: `Duffel Bag`,
	description: [`2 rounds to access.`],
	size: 3
})
DuffelBag.slots = 40

export default DuffelBag
