import Gear from '$classes/Gear.js'
import Barbed from '$rules/gear/attributes/Barbed.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const Barbed = new Gear({
	id: ``,
	name: `Barbed Arrow`,
	type: `Ammo`,
	desc: [
		`Hunting arrow.`,
	],
	sz: 0.1,
	attr: [
		Barbed,
		Pierce,
	],
})
Barbed.cal = `Arrow`

export default Barbed