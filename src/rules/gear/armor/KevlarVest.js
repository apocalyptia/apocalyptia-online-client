import Armor from '/src/classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const KevlarVest = new Armor({
	name: `Kevlar Vest`,
	sz: 3,
	attr: [ColdResistance, FireResistance],
	type: `Armor`
})
KevlarVest.dr = 2
KevlarVest.loc = `Torso`

export default KevlarVest
