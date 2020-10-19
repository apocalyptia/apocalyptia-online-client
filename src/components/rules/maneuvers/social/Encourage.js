import Maneuver from 'rules/maneuvers/Maneuver.js'


const Encourage = new Maneuver({
	id: `46b57ab5-e31d-4d60-902b-b9f56d95168d`,
	cat: `Social`,
	name: `Encourage`,
	desc: [
		`Roll [Leadership vs groups’ total Demeanor scores].`,
		`The group gets a bonus = [your Demeanor] for one specific roll each.`,
		`A Botch is -1 to all rolls.`,
	]
})

export default Encourage