import Gear from 'classes/Gear.js'
import FireResistance from 'attributes/FireResistance.js'

const WorkGloves = new Gear({
	id: `05dbfaf0-40aa-498e-a19e-d57bcdd1d6b7`,
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