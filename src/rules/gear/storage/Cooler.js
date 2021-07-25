import Storage from '/src/classes/gear/Storage.js'

const Cooler = new Storage({
	name: `Cooler`,
	description: [`Preserves Hunted or Foraged Food for 6 days.`],
	slots: 30,
	size: 5,
})

export default Cooler
