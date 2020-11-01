import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Blunt from 'attributes/Blunt.js'
import Slow from 'attributes/Slow.js'

const Sledgehammer = new Gear({
	id: `746da84b-263b-4b41-90c4-a512014e86d7`,
	name: `Sledgehammer`,
	sz: 5,
	attr: [
		TwoHanded,
		Blunt,
		Slow,
	]
})
Sledgehammer.dmg = 4
Sledgehammer.rng = 2

export default Sledgehammer