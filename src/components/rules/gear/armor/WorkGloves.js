import Armor from './Armor'
import FireResistance from '../attributes/armor/FireResistance'


const WorkGloves = new Armor({
	name: `Work Gloves`,
	sz: 1,
	dr: 1,
	loc: `Arms`,
	attr: [
		FireResistance,
	]
})

export default WorkGloves