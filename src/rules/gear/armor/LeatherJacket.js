import Armor from '/src/classes/gear/Armor.js'

const LeatherJacket = new Armor({
	name: `Leather Jacket`,
	sz: 2,
	type: `Armor`
})
LeatherJacket.dr = 1
LeatherJacket.loc = `Arms, Torso`

export default LeatherJacket
