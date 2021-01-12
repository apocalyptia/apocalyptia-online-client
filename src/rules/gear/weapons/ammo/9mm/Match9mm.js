import Gear from 'classes/Gear.js'
import Match from 'rules/gear/attributes/Match.js'

const Match9mm = new Gear({
	id: ``,
	name: `9mm Match`,
	type: `Ammo`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.01,
	attr: [
		Match,
	]
})
Match9mm.cal = `9mm`

export default Match9mm