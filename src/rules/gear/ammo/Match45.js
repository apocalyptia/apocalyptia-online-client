import Gear from '../../../classes/Gear.js' 
import Match from '../attributes/Match.js' 

const Match45 = new Gear({
	name: `.45 Match`,
	type: `Ammo`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.01,
	attr: [
		Match,
	]
})
Match45.cal = `.45`

export default Match45