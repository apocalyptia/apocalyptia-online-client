import Maneuver from '/src/classes/Maneuver.js'

const Trip = new Maneuver({
	name: `Trip`,
	desc: [`Roll [Melee vs Agility] to knock an enemy Prone. 1 Damage.`],
	type: `Offensive`
})

export default Trip
