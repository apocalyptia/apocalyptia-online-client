import Rule from 'classes/Rule.js'

const Range = new Rule({
	name: `Range`, 
	desc: [
		`Ranged Attacks made at Point-Blank Range (3yrds or less) get a +3 bonus.`,
		`Ranged Attacks made beyond the weapon's ideal range take a -1 penalty per additional Range increment.`,
		`A weapon's maximum effective Range is 10 Range increments.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
	],
	type: `Status`
})

export default Range