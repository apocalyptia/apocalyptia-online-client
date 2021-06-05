import Maneuver from '/src/classes/Maneuver.js'

const Encourage = new Maneuver({
	name: `Encourage`,
	description: [
		`Roll [Leadership vs groups’ total Demeanor scores].`,
		`The group gets a bonus = [your Demeanor] for one specific roll each.`,
		`A Botch is -1 to all rolls.`
	],
	mode: `Social`
})

export default Encourage
