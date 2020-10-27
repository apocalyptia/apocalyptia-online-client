import Gear from 'gear/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Pierce from 'attributes/Pierce.js'
import Rapid from 'attributes/Rapid.js'

const Knife = new Gear({
	id: `077adc37-a0e4-4282-8641-74c648c8f5cd`,
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