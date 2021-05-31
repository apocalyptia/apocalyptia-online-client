import Status from '/src/classes/Status.js'

const Range = new Status({
	name: `Range`,
	desc: [
		`Projectile Attacks made at Point-Blank Range (3yrds or less) get a +3 bonus.`,
		`Projectile Attacks targeting beyond the weapon's Range take a -1 Attack penalty per additional Range increment.`,
		`A Projectile weapon's maximum effective Range is the weapon's Range x10.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`
	],
	type: `Status`
})

export default Range
