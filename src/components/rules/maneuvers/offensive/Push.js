import Maneuver from 'rules/maneuvers/Maneuver.js'


const Push = new Maneuver({
	id: `d12992e8-2616-45ad-b909-e8315de8d0a9`,
	cat: `Offensive`,
	name: `Push`,
	desc: [
		`Roll [Constitution vs Constitution] to push an enemy in front of you.`,
		`While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. No Damage.`,
	]
})

export default Push