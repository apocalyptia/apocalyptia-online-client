import Armor from './Armor'
import ColdResistance from '../attributes/armor/ColdResistance'
import FireResistance from '../attributes/armor/FireResistance'


const KevlarVest = new Armor({
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