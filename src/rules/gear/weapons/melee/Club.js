import Gear from 'classes/Gear.js'
import OneHanded from 'rules/gear/attributes/OneHanded.js'
import Blunt from 'rules/gear/attributes/Blunt.js'

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