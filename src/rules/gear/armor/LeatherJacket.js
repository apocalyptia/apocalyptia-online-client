import Gear from '/src/classes/Gear.js'

const LeatherJacket = new Gear({
	id: ``,
	name: `Leather Jacket`,
	sz: 2,
	type: `Armor`
})
LeatherJacket.dr = 1
LeatherJacket.loc = `Arms, Torso`

export default LeatherJacket