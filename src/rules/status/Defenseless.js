import Status from '/src/classes/Status.js'

const Defenseless = new Status({
	name: `Defenseless`,
	desc: [
		`You must use a Reflexive Defense.`,
		`Use your Block score against Melee Attacks and you Dodge score against Projectile Attacks.`
	],
	type: `Status`
})

export default Defenseless
