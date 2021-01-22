import Gear from '$classes/Gear.js'
import TwoHanded from '$rules/gear/attributes/TwoHanded.js'

const BarnettCrossbow = new Gear({
	id: ``,
	name: `Barnett Crossbow`,
	type: `Ranged Weapon`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
BarnettCrossbow.dmg = 3
BarnettCrossbow.rng = 15
BarnettCrossbow.cap = 1
BarnettCrossbow.cal = `Arrow`

export default BarnettCrossbow