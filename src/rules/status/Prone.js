import Status from '/src/classes/Status.js'

const Prone = new Status({
	name: `Prone`,
	description: [
		`You may drop Prone at any time for free as part of a Movement or Dodge Action.`,
		`The benefits are that you get a +3 bonus to Projectile and Stealth, and enemies beyond 10yrds take a -3 Projectile Attack penalty to hit you.`,
		`The drawbacks are that your Speed is 1yrd and you take a -3 penalty to Dodge.`,
		`Standing up takes 1 Action.`,
	],
	type: `Status`,
})

export default Prone
