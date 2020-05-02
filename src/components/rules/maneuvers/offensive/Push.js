import Maneuver from '../../../classes/Maneuver'


const Push = new Maneuver({
	cat: `Offensive`,
	name: `Push`,
	desc: [
		`Roll [Constitution vs Constitution] to push an enemy in front of you.`,
		`While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. No Damage.`,
	]
})

export default Push