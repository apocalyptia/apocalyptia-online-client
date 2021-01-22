import Gear from '$classes/Gear.js'
import Scatter from '$rules/gear/attributes/Scatter.js'

const Buckshot12g = new Gear({
	id: ``,
	name: `12g Buckshot`,
	type: `Ammo`,
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