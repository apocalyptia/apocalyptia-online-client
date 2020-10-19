import Rule from 'rules/Rule.js'


const Range = new Rule({
	id: `3bca9734-b437-424e-a1e0-16b4a012af50`,
	name: `Range`, 
	desc: [
		`Ranged Attacks take a -1 penalty per additional Range increment.`,
		`Maximum Range is 10 Range increments.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
	]
})

export default Range