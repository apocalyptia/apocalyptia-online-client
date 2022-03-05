import Maneuver from '$classes/Maneuver.js'

const Shove = new Maneuver({
	name: `Shove`,
	description: [
		`Roll [ Melee vs Constitution ] to shove an enemy up to [ Constitution / 2 ] yards away from you, knocking them Prone. No Damage.`
	],
	mode: `Offensive`
})

export default Shove
