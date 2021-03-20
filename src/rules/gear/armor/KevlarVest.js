import Gear from '/src/classes/Gear.js'
import ColdResistance from '/src/rules/gear/attributes/ColdResistance.js'
import FireResistance from '/src/rules/gear/attributes/FireResistance.js'

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