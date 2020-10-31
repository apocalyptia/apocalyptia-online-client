import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const Remington700 = new Gear({
	id: `6398a22b-e4a9-4c9f-a984-3bf6aaa09146`,
	name: `Remington 700 Rifle`,
	sz: 4,
	attr: [
		TwoHanded,
	]
})
Remington700.dmg = 6
Remington700.rng = 100
Remington700.cap = 5
Remington700.cal = `.308`

export default Remington700