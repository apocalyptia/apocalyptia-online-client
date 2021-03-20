import Gear from '/src/classes/Gear.js'

const Cooler = new Gear({
	id: ``,
	name: `Cooler`,
	desc: [
		`Preserves Hunted or Foraged Food for 6 days.`,
	],
	sz: 5
})
Cooler.slots = 30

export default Cooler