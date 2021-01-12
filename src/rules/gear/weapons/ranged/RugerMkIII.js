import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'
import Rapid from 'rules/gear/attributes/Rapid.js'

const RugerMkIII = new Gear({
	id: ``,
	name: `Ruger Mk.III Pistol`,
	type: `Ranged Weapon`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid,
	]
})
RugerMkIII.dmg = 1
RugerMkIII.rng = 15
RugerMkIII.cap = 10
RugerMkIII.cal = `.22`

export default RugerMkIII