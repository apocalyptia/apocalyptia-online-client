import Rule from '../../classes/Rule'


const Range = new Rule({
	name: `Range`, 
	desc: [
		`Ranged Attacks take a -1 penalty per additional Range increment.`,
		`Maximum Range is 10 Range increments.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
	]
})

export default Range