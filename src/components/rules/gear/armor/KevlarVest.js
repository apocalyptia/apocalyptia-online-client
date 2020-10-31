import Gear from 'gear/Gear.js'
import ColdResistance from 'attributes/ColdResistance.js'
import FireResistance from 'attributes/FireResistance.js'

const KevlarVest = new Gear({
	id: `a4d0d99a-3546-4805-912c-4ffb2fbe0c85`,
	name: `Kevlar Vest`,
	sz: 4,
	attr: [
		ColdResistance,
		FireResistance,
	],
	type: `Armor`
})
KevlarVest.dr = 2
KevlarVest.loc = `Torso`

export default KevlarVest