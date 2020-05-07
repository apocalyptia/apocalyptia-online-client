import Storage from './Storage'


const Cooler = new Storage({
	name: `Cooler`,
	desc: [
		`Hunted or Foraged Food lasts 6 days.`,
	],
	sz: 4,
	slots: 30
})

export default Cooler