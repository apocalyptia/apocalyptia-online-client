import Gear from '$classes/Gear.js'
import NeedleBodkin from '$rules/gear/attributes/NeedleBodkin.js'
import Pierce from '$rules/gear/attributes/Pierce.js'

const NeedleBodkin = new Gear({
	id: ``,
	name: `Needle Bodkin Arrow`,
	type: `Ammo`,
	desc: [
		`Hunting arrow.`,
	],
	sz: 0.1,
	attr: [
		NeedleBodkin,
		Pierce,
	],
})
NeedleBodkin.cal = `Arrow`

export default NeedleBodkin