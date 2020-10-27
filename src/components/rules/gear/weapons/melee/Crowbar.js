import Gear from 'gear/Gear.js'
import OneHanded from 'attributes/OneHanded.js'

const Crowbar = new Gear({
	id: `328afbe9-a374-486f-b41b-2f4e4e7f8958`,
	name: `Crowbar`,
	sz: 3,
	attr: [
		OneHanded,
	]
})
Crowbar.dmg = 3
Crowbar.rng = 2

export default Crowbar