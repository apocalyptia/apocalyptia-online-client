import Maneuver from '../Maneuver'


const Recruit = new Maneuver({
	cat: `Social`,
	name: `Recruit`,
	desc: [
		`Roll [Socialize vs Demeanor] to convince someone to join your side.`,
		`If they are someone’s follower, roll [Leadership vs Leadership].`,
		`Attitude and other contextual modifiers should be applied at the Narrator's discretion.`,
	]
})

export default Recruit