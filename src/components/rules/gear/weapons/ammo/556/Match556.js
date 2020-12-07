import Gear from 'classes/Gear.js'
import Match from 'attributes/Match.js'

const Match556 = new Gear({
	name: `5.56mm Match`,
	type: `Ammo`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	attr: [
		Match,
	]
})
Match556.cal = `5.56`

export default Match556