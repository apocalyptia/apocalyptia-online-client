import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Chop from 'attributes/Chop.js'
import Slow from 'attributes/Slow.js'

const Ax = new Gear({
	id: `a9aead5f-27f8-4727-84b0-6fdd536d52f8`,
	name: `Ax`,
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