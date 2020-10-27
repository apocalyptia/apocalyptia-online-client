import Gear from 'gear/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Blunt from 'attributes/Blunt.js'

const Club = new Gear({
	id: `5f8b0bd9-1b1c-4c44-9c31-e76db4f4a663`,
	name: `Club`,
	sz: 2,
	attr: [
		OneHanded,
		Blunt,
	]
})
Club.dmg = 2
Club.rng = 2

export default Club