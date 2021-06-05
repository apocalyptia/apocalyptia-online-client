import Hazard from '/src/classes/Hazard.js'

const FriendlyFire = new Hazard({
	name: `Friendly Fire`,
	description: [
		`-3 Projectile against targets within 1yd of your ally.`,
		`If the Projectile Attack Fails, re-roll the Projectile Attack vs the ally’s Reflexive Dodge.`
	],
	type: `Hazard`
})

export default FriendlyFire
