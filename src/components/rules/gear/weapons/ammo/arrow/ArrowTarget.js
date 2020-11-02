import Gear from 'classes/Gear.js'

const ArrowTarget = new Gear({
	name: `Target Arrow`,
	desc: [
		`Practice arrow.`,
	],
	sz: 0.1
})
ArrowTarget.cal = `Arrow`

export default ArrowTarget