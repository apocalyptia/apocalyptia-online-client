import Gear from '$classes/Gear.js'
import OneHanded from '$rules/gear/attributes/OneHanded.js'
import Pierce from '$rules/gear/attributes/Pierce.js'
import Rapid from '$rules/gear/attributes/Rapid.js'

const Dagger = new Gear({
	id: ``,
	name: `Dagger`,
	type: `Melee Weapon`,
	sz: 1,
	attr: [
		OneHanded,
		Pierce,
		Rapid,
	]
})
Dagger.dmg = 1
Dagger.rng = 1

export default Dagger