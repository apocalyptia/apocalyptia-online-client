import Maneuver from '../Maneuver'


const Encourage = new Maneuver({
	cat: `Social`,
	name: `Encourage`,
	desc: [
		`Roll [Leadership vs groups’ total Demeanor scores].`,
		`The group gets a bonus = [your Demeanor] for one specific roll each.`,
		`A Botch is -1 to all rolls.`,
	]
})

export default Encourage