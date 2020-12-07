import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Chop from 'attributes/Chop.js'
import Slow from 'attributes/Slow.js'

const Ax = new Gear({
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