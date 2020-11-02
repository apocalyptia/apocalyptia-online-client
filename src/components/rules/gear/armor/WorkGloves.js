import Gear from 'classes/Gear.js'
import FireResistance from 'attributes/FireResistance.js'

const WorkGloves = new Gear({
	name: `Work Gloves`,
	sz: 1,
	attr: [
		FireResistance,
	],
	type: `Armor`
})
WorkGloves.dr = 1
WorkGloves.loc = `Arms`

export default WorkGloves