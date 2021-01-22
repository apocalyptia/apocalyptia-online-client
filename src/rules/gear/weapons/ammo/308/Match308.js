import Gear from '$classes/Gear.js'
import Match from '$rules/gear/attributes/Match.js'

const Match308 = new Gear({
	id: ``,
	name: `.308 Match`,
	type: `Ammo`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.02,
	attr: [
		Match,
	]
})
Match308.cal = `.308`

export default Match308