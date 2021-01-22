import Gear from '$classes/Gear.js'
import TwoHanded from '$rules/gear/attributes/TwoHanded.js'
import Scatter from '$rules/gear/attributes/Scatter.js'

const Mossberg500 = new Gear({
	id: ``,
	name: `Mossberg 500 Shotgun`,
	type: `Ranged Weapon`,
	sz: 2,
	attr: [
		TwoHanded,
		Scatter,
	]
})
Mossberg500.dmg = 5
Mossberg500.rng = 10
Mossberg500.cap = 5
Mossberg500.cal = `12g`

export default Mossberg500