import Gear from '../../../classes/Gear.js'

const Standard45 = new Gear({
	name: `.45 Standard`,
	type: `Ammo`,
	desc: [`Basic ammunition.`],
	sz: 0.01
})
Standard45.cal = `.45`

export default Standard45
