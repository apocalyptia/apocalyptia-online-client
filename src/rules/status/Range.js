import Rule from 'classes/Rule.js'

const Range = new Rule({
	name: `Range`, 
	desc: [
		`Ranged Attacks made at Point-Blank Range (3yrds or less) get a +3 bonus.`,
		`Ranged Attacks targeting beyond the weapon's Range take a -1 Attack penalty per additional Range increment.`,
		`A Ranged weapon's maximum effective Range is the weapon's Range x10.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
	],
	type: `Status`
})

export default Range