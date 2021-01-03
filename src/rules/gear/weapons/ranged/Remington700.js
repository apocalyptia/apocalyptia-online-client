import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'

const Remington700 = new Gear({
	name: `Remington 700 Rifle`,
	type: `Ranged Weapon`,
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