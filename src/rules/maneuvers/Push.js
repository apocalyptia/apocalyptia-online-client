import Maneuver from '/src/classes/Maneuver.js'

const Push = new Maneuver({
	name: `Push`,
	description: [
		`Roll [Constitution vs Constitution] to push an enemy in front of you.`,
		`While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. No Damage.`
	],
	mode: `Offensive`
})

export default Push
