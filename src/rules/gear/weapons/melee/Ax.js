import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Chop from '/src/rules/gear/attributes/Chop.js'
import Slow from '/src/rules/gear/attributes/Slow.js'

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