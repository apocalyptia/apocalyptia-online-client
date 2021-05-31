import Maneuver from '/src/classes/Maneuver.js'

const Shove = new Maneuver({
	name: `Shove`,
	desc: [
		`Roll [Melee vs Constitution] to shove an enemy up to [Constitution / 2] yds away from you, knocking them Prone. No Damage.`
	],
	mode: `Offensive`
})

export default Shove
