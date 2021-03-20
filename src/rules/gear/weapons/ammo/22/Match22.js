import Gear from '/src/classes/Gear.js'
import Match from '/src/rules/gear/attributes/Match.js'

const Match22 = new Gear({
	id: ``,
	name: `.22 Match`,
	type: `Ammo`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.005,
	attr: [
		Match,
	],
})
Match22.cal = `.22`

export default Match22