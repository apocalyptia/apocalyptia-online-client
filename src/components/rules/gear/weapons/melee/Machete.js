import Gear from 'classes/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Chop from 'attributes/Chop.js'

const Machete = new Gear({
	id: `3e6a26a1-df4c-45db-acf0-a33f0948dc5f`,
	name: `Machete`,
	sz: 2,
	attr: [
		OneHanded,
		Chop,
	]
})
Machete.dmg = 3
Machete.rng = 2

export default Machete