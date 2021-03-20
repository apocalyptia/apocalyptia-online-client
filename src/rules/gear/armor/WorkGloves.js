import Gear from '/src/classes/Gear.js'
import FireResistance from '/src/rules/gear/attributes/FireResistance.js'

const WorkGloves = new Gear({
	id: ``,
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