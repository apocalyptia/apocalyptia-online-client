import Armor from './Armor'
import FireResistance from '../attributes/armor/FireResistance'


const WorkGloves = new Armor({
	id: `05dbfaf0-40aa-498e-a19e-d57bcdd1d6b7`,
	name: `Work Gloves`,
	sz: 1,
	dr: 1,
	loc: `Arms`,
	attr: [
		FireResistance,
	]
})

export default WorkGloves