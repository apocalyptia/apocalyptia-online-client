import Gear from '/src/classes/Gear.js'

const ArrowTarget = new Gear({
	id: ``,
	name: `Target Arrow`,
	type: `Ammo`,
	desc: [
		`Practice arrow.`,
	],
	sz: 0.1
})
ArrowTarget.cal = `Arrow`

export default ArrowTarget