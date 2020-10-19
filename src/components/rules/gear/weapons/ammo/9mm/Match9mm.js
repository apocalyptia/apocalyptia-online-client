import Ammo from 'gear/weapons/ammo/Ammo.js'
import Match from 'gear/attributes/weapon/Match.js'


const Match9mm = new Ammo({
	id: `dcfa9f26-6c02-4646-b369-ff8ba26246da`,
	name: `9mm Match`,
	desc: [
		`Competition-grade ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
	attr: [
		Match,
	]
})

export default Match9mm