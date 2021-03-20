import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Rapid from '/src/rules/gear/attributes/Rapid.js'

const Kimber1911 = new Gear({
	id: ``,
	name: `Kimber 1911 Pistol`,
	type: `Ranged Weapon`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid,
	]
})
Kimber1911.dmg = 1
Kimber1911.rng = 15
Kimber1911.cap = 7
Kimber1911.cal = `.45`

export default Kimber1911