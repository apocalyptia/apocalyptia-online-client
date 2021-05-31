import Storage from '/src/classes/gear/Storage.js'

const Cooler = new Storage({
	name: `Cooler`,
	desc: [`Preserves Hunted or Foraged Food for 6 days.`],
	sz: 5
})
Cooler.slots = 30

export default Cooler
