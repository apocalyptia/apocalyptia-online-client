import Gear from 'classes/Gear.js'
import Scatter from 'attributes/Scatter.js'

const Buckshot12g = new Gear({
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