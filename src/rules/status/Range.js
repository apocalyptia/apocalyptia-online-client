import Status from '/src/classes/Status.js'

const Range = new Status({
	name: `Range`,
	description: [
		`Projectile Attacks made at Point-Blank Range (3yrds or less) get a +3 bonus.`,
		`Projectile Attacks targeting beyond the weapon's Range take a -1 Attack penalty per additional Range increment.`,
		`Projectile (Firearm) weapons have a maximum effective Range equal to x10 the base weapon Range.`,
		`Projectile (Traditional) weapons have a maximum effective Range equal to x5 the base weapon Range.`,
		`Melee Attacks take a modifier against Melee weapons that have a different Range = [your weapon’s Range - enemy weapon’s Range].`,
	],
	type: `Status`,
})

export default Range
