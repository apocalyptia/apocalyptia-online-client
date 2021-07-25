import Wearable from '/src/classes/gear/Wearable.js'

const CargoPants = new Wearable({
	name: `Cargo Pants`,
	description: [`Camo.`],
	size: 1,
})
CargoPants.slots = 6

export default CargoPants
