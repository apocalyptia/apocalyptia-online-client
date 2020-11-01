import Gear from 'classes/Gear.js'
import Match from 'attributes/Match.js'

const Match9mm = new Gear({
	id: `dcfa9f26-6c02-4646-b369-ff8ba26246da`,
	name: `9mm Match`,
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