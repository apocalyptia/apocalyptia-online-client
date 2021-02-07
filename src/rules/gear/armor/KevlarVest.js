import Gear from '$classes/Gear.js'
import ColdResistance from '$rules/gear/attributes/ColdResistance.js'
import FireResistance from '$rules/gear/attributes/FireResistance.js'

const KevlarVest = new Gear({
	id: ``,
	name: `Kevlar Vest`,
	sz: 3,
	attr: [
		ColdResistance,
		FireResistance,
	],
	type: `Armor`
})
KevlarVest.dr = 2
KevlarVest.loc = `Torso`

export default KevlarVest