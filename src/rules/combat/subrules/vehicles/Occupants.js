import Rule from '../../classes/Rule.js'

const Occupants = new Rule({
	name: `Occupants`,
	desc: [
		`Passengers in a moving vehicle are Unstable.`,
		`A vehicle provides Cover from Projectile Attacks with its Absorption.`
	]
})

export default Occupants
