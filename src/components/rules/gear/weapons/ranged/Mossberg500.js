import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Scatter from 'attributes/Scatter.js'

const Mossberg500 = new Gear({
	id: `6f193dc4-5a9e-4eb5-bdf6-59e0ca24c56a`,
	name: `Mossberg 500`,
	sz: 2,
	attr: [
		TwoHanded,
		Scatter,
	]
})
Mossberg500.dmg = 4
Mossberg500.rng = 10
Mossberg500.cap = 5
Mossberg500.cal = `12g`

export default Mossberg500