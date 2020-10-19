import Armor from 'gear/armor/Armor.js'
import ColdResistance from 'gear/attributes/armor/ColdResistance.js'
import FireResistance from 'gear/attributes/armor/FireResistance.js'


const KevlarVest = new Armor({
	id: `a4d0d99a-3546-4805-912c-4ffb2fbe0c85`,
	name: `Kevlar Vest`,
	sz: 4,
	dr: 3,
	loc: `Torso`,
	attr: [
		ColdResistance,
		FireResistance,
	]
})

export default KevlarVest