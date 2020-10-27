import Gear from 'gear/Gear.js'
import Scatter from 'attributes/Scatter.js'

const Buckshot12g = new Gear({
	id: `facd4679-38bc-4a4d-9da9-8dda5d569094`,
	name: `12g Buckshot`,
	desc: [
		`Scatter-shot ammunition.`,
	],
	sz: 0.05,
	attr: [
		Scatter,
	]
})
Buckshot12g.cal = `12g`

export default Buckshot12g