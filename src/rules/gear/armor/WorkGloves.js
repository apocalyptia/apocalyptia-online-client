import Armor from '/src/classes/gear/Armor.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const WorkGloves = new Armor({
	name: `Work Gloves`,
	sz: 0,
	attr: [FireResistance],
	type: `Armor`
})
WorkGloves.dr = 1
WorkGloves.loc = `Arms`

export default WorkGloves
