import Gear from 'classes/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Pierce from 'attributes/Pierce.js'
import Rapid from 'attributes/Rapid.js'

const Knife = new Gear({
	name: `Knife`,
	sz: 1,
	attr: [
		OneHanded,
		Pierce,
		Rapid,
	]
})
Knife.dmg = 1
Knife.rng = 1

export default Knife