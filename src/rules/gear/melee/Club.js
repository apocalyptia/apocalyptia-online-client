import Melee from '/src/classes/gear/Melee.js'
import OneHanded from '../attributes/OneHanded.js'
import Blunt from '../attributes/Blunt.js'

const Club = new Melee({
	name: `Club`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [OneHanded, Blunt]
})
Club.dmg = 2
Club.rng = 2

export default Club
