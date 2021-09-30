import Gear from '$classes/Gear.js'
import OneHanded from '$rules/gear/attributes/OneHanded.js'
import Chop from '$rules/gear/attributes/Chop.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const BattleAxe = new Gear({
	id: ``,
	name: `Battle Axe`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		OneHanded,
		Chop,
		Pierce,
	]
})
BattleAxe.dmg = 3
BattleAxe.rng = 2

export default BattleAxe