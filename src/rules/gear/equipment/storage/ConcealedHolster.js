import Gear from '/src/classes/Gear.js'

const ConcealedHolster = new Gear({
	id: ``,
	name: `Concealed Holster`,
	desc: [
		`Perception 12# to spot a Size 1 Gun.`,
	],
	sz: 0
})
ConcealedHolster.slots = 1

export default ConcealedHolster