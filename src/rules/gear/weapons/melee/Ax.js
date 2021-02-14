import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'
import Chop from 'rules/gear/attributes/Chop.js'
import Slow from 'rules/gear/attributes/Slow.js'

const Ax = new Gear({
	id: ``,
	name: `Ax`,
	type: `Melee Weapon`,
	sz: 4,
	attr: [
		TwoHanded,
		Chop,
		Slow,
	]
})
Ax.dmg = 4
Ax.rng = 2

export default Ax