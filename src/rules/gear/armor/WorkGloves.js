import Gear from '../../../classes/Gear.js' 
import FireResistance from '../../gear/attributes/FireResistance.js' 

const WorkGloves = new Gear({
	name: `Work Gloves`,
	sz: 0,
	attr: [
		FireResistance,
	],
	type: `Armor`
})
WorkGloves.dr = 1
WorkGloves.loc = `Arms`

export default WorkGloves