import Gear from '/src/classes/Gear.js'
import OneHanded from '/src/rules/gear/attributes/OneHanded.js'
import Blunt from '/src/rules/gear/attributes/Blunt.js'

const Club = new Gear({
	id: ``,
	name: `Club`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		OneHanded,
		Blunt,
	]
})
Club.dmg = 2
Club.rng = 2

export default Club