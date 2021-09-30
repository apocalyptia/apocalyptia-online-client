import Gear from '$classes/Gear.js'
import PlateCutter from '$rules/gear/attributes/PlateCutter.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const PlateCutter = new Gear({
	id: ``,
	name: `Plate Cutter Arrow`,
	type: `Ammo`,
	desc: [
		`Hunting arrow.`,
	],
	sz: 0.1,
	attr: [
		PlateCutter,
		Pierce,
	],
})
PlateCutter.cal = `Arrow`

export default PlateCutter