import Maneuver from '$classes/Maneuver.js'

const Recruit = new Maneuver({
	name: `Recruit`,
	description: [
		`Roll [ Socialize vs Demeanor ] to convince someone to join your side.`,
		`If they are someone’s follower, roll [ Leadership vs Leadership ].`,
		`Attitude and other contextual modifiers should be applied at the Narrator's discretion.`,
	],
	mode: `Social`,
})

export default Recruit
